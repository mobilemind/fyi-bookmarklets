#!/usr/bin/make -f

##
# FYI PROJECT
#
# directories/paths
SRC := src
BUILD := build
WEB := web
LOCALLIB := lib
COMMONLIB := $$HOME/common/lib
VPATH := $(WEB):$(BUILD)
# files
PROJWEB := $(WEB)/fyi-firefox.js $(WEB)/fyi-ie.js $(WEB)/fyi-webkit.js
VERSIONTXT := $(SRC)/VERSIONS.txt
README = README.md
# macros/utils
JSLINT := jsl
JSLINTOPTIONS := -nologo -nofilelisting -nosummary
PERL := perl
YUICOMPRESSOR := $(shell type -p yuicompressor || echo 'java -jar $(COMMONLIB)/yuicompressor-2.4.7.jar')
COMPRESSOPTIONS := --type js --nomunge --disable-optimizations
NODEJS := $(shell type -p node || type -p nodejs)
MAKEBOOKMARK := $(LOCALLIB)/process-js2bookmarkURI.js
VERSIONOLD := $(shell head -n 1 $(VERSIONTXT))
VERSIONNEW := $(shell tail -n 1 $(VERSIONTXT))

default: $(PROJWEB) $(README) | $(BUILD) $(WEB)
	@echo 'Done.'; echo

# update README with pastelet URLS just built
$(README): $(VERSIONTXT) | $(PROJWEB)
	@echo 'Updating README…'
	@(cat $(WEB)/fyi-webkit.js | tr -d "\n" > uri.tmp; echo; \
		perl -p -i -e 'BEGIN{open F,"uri.tmp";@f=<F>}s/(?<=http:\/\/mmind\.me\/_\?)javascript:.*?(?=\")/@f/g' $@; \
		perl -p -i -e 'BEGIN{open F,"uri.tmp";@f=<F>}s/(?<=webkit\*\* - <a href=\")javascript:.*?(?=\")/@f/g' $@; \
		cat $(WEB)/fyi-firefox.js | tr -d "\n" > uri.tmp; \
		perl -p -i -e 'BEGIN{open F,"uri.tmp";@f=<F>}s/(?<=firefox\*\* - <a href=\")javascript:.*?(?=\")/@f/g' $@; \
		cat $(WEB)/fyi-ie.js | tr -d "\n" > uri.tmp; \
		perl -p -i -e 'BEGIN{open F,"uri.tmp";@f=<F>}s/(?<=ie\*\* - <a href=\")javascript:.*?(?=\")/@f/g' $@; \
		rm -f uri.tmp; \
	)

# run JSLINT then prepend with 'javascript:' and encodeURI (preserving Firefox '%s' token)
$(WEB)/%.js: $(BUILD)/%.js | $(BUILD) $(WEB)
	@echo "   $@"
	@$(JSLINT) -process $< $(JSLINTOPTIONS) > /dev/null ; [ $$? -lt 2 ] || ( \
		echo "*** ERROR: $^"; $(JSLINT) -process $< $(JSLINTOPTIONS); \
		exit 1)
ifeq ($(@F),fyi-firefox.com.js)
	@($(PERL) -pe "s/\%s\"\)/_PERCENT_S_\"\)/g;" < $^ > $^.tmp; \
		$(NODEJS) $(MAKEBOOKMARK) $^.tmp | $(PERL) -pe "s/_PERCENT_S_/\%s/g;" > $@ && \
		rm -f $^.tmp )
else
	@$(NODEJS) $(MAKEBOOKMARK) $^ > $@
endif

# uncomment '.SECONDARY' rule below to retain contents of $(BUILD)
#.SECONDARY: $(BUILD)/fyi-firefox.js $(BUILD)/fyi-ie.js $(BUILD)/fyi-webkit.js

# replace tokens & minify JavaScript
$(BUILD)/%.js: $(SRC)/%.js $(VERSIONTXT) | $(BUILD)
	@$(PERL) -pe "s/void\(\'$(VERSIONOLD)\'\)/void\(\'$(VERSIONNEW)\'\)/g;" < $< > $@.tmp || ( \
		echo "*** ERROR with: $(PERL) -p -i -e \"s/void\(\'$(VERSIONOLD)\'\)/void\(\'$(VERSIONNEW)\'\)/g;\" $@"; \
		exit 1 )
	@$(YUICOMPRESSOR) $(COMPRESSOPTIONS) -o $@ $@.tmp || ( \
		echo "*** ERROR with: $(YUICOMPRESSOR) $(COMPRESSOPTIONS) -o $@ $^"; \
		exit 1 )
	@rm -f $@.tmp

.PHONY: $(BUILD)
$(BUILD):
	@[[ -d $(BUILD) ]] || mkdir -m 744 $(BUILD)

.PHONY: $(WEB)
$(WEB):
	@[[ -d $(WEB) ]] || mkdir -m 744 $(WEB)

.PHONY: clean
clean:
	@echo 'Cleaning build directory and web directory…'
	@rm -rf $(BUILD)/* $(WEB)/* || true
