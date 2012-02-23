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
BUILDDATE := $(shell date)
NULLSTR := ""
VERSION := $(shell curl -sS $(SRCURL)/$(VERSIONTXT) | tail -n 1)
# macros/utils
GRECHO = $(shell hash grecho &> /dev/null && echo 'grecho' || echo 'printf')
thefile = $(@F)
stem = $(thefile:.js=)


default: $(INDEXFILE)
	@echo
	@$(GRECHO) 'make:' "Done. Remember to- make deploy.\n"

$(INDEXFILE):  $(BUILDJS)
	@printf "\nValidate $@\n"
	@hash tidy && (tidy -eq $@; [[ $$? -lt 2 ]] && true);

$(BUILDJS):
	@printf "\nGet $@ and update link in $(INDEXFILE)\n"
	@curl -# -o $@ $(WEBURL)/$(@F) && perl -p -i -e 's/&/&amp;/g;' $@
	@perl -p -i -e 'BEGIN{open F,"$@";@f=<F>}s#javascript:.*?(?=\"$(STEM))#@f#g;' $(INDEXFILE)


# deploy
.PHONY: deploy
deploy: $(INDEXFILE)
	@echo
	@echo 'make:' "Deploy to github"
	@git add $(INDEXFILE) && git commit -m 'update gh-pages for v$(VERSION)' && git push
	@echo
	@$(GRECHO) 'make:' "Done. Deployed $(PROJ) to github.com\n"

.PHONY: clean
clean:
	rm -fv $(BUILDDIR)/*.js
