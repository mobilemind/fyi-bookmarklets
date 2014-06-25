#!/usr/bin/make -f

##
# FYI-BOOKMARKLETS GH-PAGES
##
PROJ := fyi-bookmarklets

# files
INDEXFILE := index.html
FYIFIREFOX := fyi-firefox.js
FYIIE := fyi-ie.js
FYIWEBKIT := fyi-webkit.js
PKGFILE := package.json

# urls
PROJURL := https://raw.githubusercontent.com/mobilemind/$(PROJ)/master
FYIFIREFOXURL := $(PROJURL)/web/$(FYIFIREFOX)
FYIIEURL := $(PROJURL)/web/$(FYIIE)
FYIWEBKITURL := $(PROJURL)/web/$(FYIWEBKIT)
VERSIONURL := $(PROJURL)/$(PKGFILE)

# macros/utils
FYIFIREFOXJS := $(shell curl -s $(FYIFIREFOXURL))
FYIIEJS := $(shell curl -s $(FYIIEURL))
FYIWEBKITJS := $(shell curl -s $(FYIWEBKITURL))
VERSION := $(shell curl -s $(VERSIONURL) | awk '/"version"/ { gsub(/,|"/, "") ; print $$2 }')
GRECHO := $(shell hash grecho &> /dev/null && echo 'grecho' || echo 'printf')
TIDY := $(shell hash tidy-html5 2>/dev/null && echo 'tidy-html5' || (hash tidy 2>/dev/null && echo 'tidy' || exit 1))


default: validate
	@printf "make: Done. Remember to- make deploy.\n\n"

.PHONY:	validate
validate: update
	@echo 'Validate $(INDEXFILE)'
	@$(TIDY) -eq $(INDEXFILE) || [ $$? -lt 2 ]

.PHONY: update
update:
	@printf "\nRefresh $(INDEXFILE)\n"
	@echo 'Update Firefox bookmark from GitHub'
	@perl -pi -e "s#javascript:.*(?=\" title=\"fyi-firefox\")#$(FYIFIREFOXJS)#g;" $(INDEXFILE)
	@echo 'Update IE bookmark from GitHub'
	@perl -pi -e "s#javascript:.*(?=\" title=\"fyi-ie\")#$(FYIIEJS)#g;" $(INDEXFILE)
	@echo 'Update Webkit bookmark from GitHub'
	@perl -pi -e "s#javascript:.*(?=\" title=\"fyi-webkit( |\"))#$(FYIWEBKITJS)#g;" $(INDEXFILE)
	@perl -pi -e 's/&body/&amp;body/g;s/&&/&amp;&amp;/g;' $(INDEXFILE)

# deploy
.PHONY: deploy
deploy: default
	@printf "make: \tDeploy: Checking git diff --name-only as trigger to update gh-pages\n"
ifeq "$(shell git diff --name-only)" ''
	@$(GRECHO) "\nmake: \tDeploy: Done. No changed files.\n\n"
else
	git commit -a -m 'revised HTML to v$(VERSION)g'
	git tag $(VERSION)g
	git push --tags origin gh-pages
	@$(GRECHO) "\nmake: \tDeploy: Done. Updated gh-pages to v$(VERSION)g. To return to master do:\n\tgit checkout master && make clean\n\n"
endif

# clean
.PHONY: clean
clean:
	@echo 'Nothing to do. (default updates index.html in-place)'
