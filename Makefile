#!/usr/bin/env make

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
GRECHO := $(shell hash grecho >/dev/null 2>&1 && echo 'grecho' || echo 'printf')
TIDY := $(shell hash tidy-html5 >/dev/null 2>&1 && echo 'tidy-html5' || (hash tidy >/dev/null 2>&1 && echo 'tidy' || echo 'echo "WARNING unable to: tidy"'))


default: validate test clean
	@printf "make: Done. Remember to- make deploy.\n\n"

.PHONY:	validate
validate: update
	@echo 'Validate $(INDEXFILE)'
	@$(TIDY) -eq $(INDEXFILE) || [ $$? -lt 2 ]

# test
.PHONY: test
test:
	@echo '  Validating that "$(INDEXFILE)" and "fyi.ico" exist'
	@[ -s "$(INDEXFILE)" ]
	@[ -s 'fyi.ico' ]
	@echo '  Validating "Available version ..." in "index.html" against GitHub "v$(VERSION)"'
	@perl -e 'while(<>){exit(0)if(/ v$(subst .,\.,$(VERSION)) /o);};exit(1);' "$(INDEXFILE)"
	@echo 'OK.'
	@echo

.PHONY: update
update:
	@printf "\nRefresh $(INDEXFILE) with versions from Github(master)\n"
	curl --remote-name-all $(PROJURL)/web/fyi-{firefox,ie,webkit}.js
	@echo 'Update Firefox bookmark from GitHub'
	perl -p -e "BEGIN{open F,'$(CURDIR)/$(FYIFIREFOX)';@f=<F>}s#javascript:.*(?=\" title=\"fyi-firefox\")#@f#g;" -i "$(INDEXFILE)"
	@echo 'Update IE bookmark from GitHub'
	perl -p -e "BEGIN{open F,'$(CURDIR)/$(FYIIE)';@f=<F>}s#javascript:.*(?=\" title=\"fyi-ie\")#@f#g;" -i "$(INDEXFILE)"
	@echo 'Update Webkit bookmark from GitHub'
	perl -p -e "BEGIN{open F,'$(CURDIR)/$(FYIWEBKIT)';@f=<F>}s#javascript:.*(?=\" title=\"fyi-webkit( |\"))#@f#g;" -i "$(INDEXFILE)"
	perl -p -e 's/&body/&amp;body/g;s/&&/&amp;&amp;/g;' -i "$(INDEXFILE)"
	@echo 'Update "Available v#.#.# versions" with GitHub version'
	perl -p -e "s/Available v\d+\.\d+\.\d+ versions/Available v$(VERSION) versions/;" -i "$(INDEXFILE)"

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
	rm -fv fyi-*.js
