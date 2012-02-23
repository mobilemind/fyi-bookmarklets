#!/usr/bin/make -f

##
# FYI-BOOKMARKLETS GH-PAGES
##
PROJ = fyi-bookmarklets
# directories/paths
SRCDIR := src
BUILDDIR := build
VPATH := :$(BUILDDIR)
# files
BUILDJS := $(BUILDDIR)/fyi-firefox.js $(BUILDDIR)/fyi-ie.js $(BUILDDIR)/fyi-webkit.js
INDEXFILE := index.html
VERSIONTXT := VERSIONS.txt
# urls
SRCURL := https://raw.github.com/mobilemind/fyi-bookmarklets/master/src
WEBURL := https://raw.github.com/mobilemind/fyi-bookmarklets/master/web
# vars
VERSION := $(shell curl -sS $(SRCURL)/$(VERSIONTXT) | tail -n 1)
BUILDDATE := $(shell date)
# macros/utils
GRECHO = $(shell hash grecho &> /dev/null && echo 'grecho' || echo 'printf')
REPLACETOKENS = perl -p -i -e 's/$(MMVERSION)/$(VERSION)/g;' $@; perl -p -i -e 's/$(MMBUILDDATE)/$(BUILDDATE)/g;' $@


default: $(INDEXFILE)
	@$(GRECHO) 'make:' "Done. REMEMBER COMMIT.\n"

$(INDEXFILE):  $(BUILDJS)
	touch $@

$(BUILDJS):
	curl -# -o $@ https://raw.github.com/mobilemind/fyi-bookmarklets/master/web/$(@F)


# deploy
.PHONY: deploy
deploy: default
	@echo 'make:' "Deploy to github"
	git status
	git add $(INDEXFILE)
	git commit --dry-run -m 'update gh-pages for v$(VERSION)'
	@(cd $(WEBDIR); \
		scp -p vnet vnetp *.manifest "$$MYUSER@$$MYSERVER:$$MYSERVERHOME/me"; \
		scp -p img/*.* "$$MYUSER@$$MYSERVER:$$MYSERVERHOME/me/img"; \
		echo \
	)
	@$(GRECHO) 'make:' "Done. Deployed $(PROJ) to github.com\n"



.PHONY: clean
clean:
	@echo 'Cleaning build directory and web directory...'
	@rm -rf $(BUILDDIR)/* || true
