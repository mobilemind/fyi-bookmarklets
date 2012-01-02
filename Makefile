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
YUICOMPRESSOR := $(shell type -p yuicompressor || echo 'java -jar $(COMMONLIB)/yuicompressor-2.4.7.jar')
COMPRESSOPTIONS := --type js --nomunge --disable-optimizations
NODEJS := $(shell type -p node || type -p nodejs)
MAKEBOOKMARK := $(LOCALLIB)/process-js2bookmarkURI.js
VERSIONOLD := $(shell head -n 1 $(VERSIONTXT))
VERSIONNEW := $(shell tail -n 1 $(VERSIONTXT))

default: $(PROJWEB) | $(BUILD) $(WEB)
	@echo 'Done.'; echo

$(README): $(VERSIONTXT) | $(PROJWEB)
	@echo 'Updating README…'
#  Use a perl script in lib to update $(README), look for
#		"(webkit** - <a href=")(javascript:… )" to replace with "\1"{web/fyi-webkit.js}
#		"(firefox** - <a href="javascript:…)" to replace with "\1"{web/fyi-firefox.js}
#		"(ie** - <a href="javascript:…)" to replace with "\1{web/fyi-ie.js}"
#		"(mmind.me/_?)(javascript:…) to replace with …{web/fyi-webkit.js}


# run JSLINT then prepend with 'javascript:' and encodeURI (preserving Firefox '%s' token)
$(WEB)/%.js: $(BUILD)/%.js | $(BUILD) $(WEB)
	@echo "   $@"
	@$(JSLINT) -process $< $(JSLINTOPTIONS) > /dev/null ; [ $$? -lt 2 ] || ( \
		echo "*** ERROR: $^"; $(JSLINT) -process $< $(JSLINTOPTIONS); \
		exit 1)
	@[[ "$(@F)" == "fyi-firefox.com.js" ]] && ( \
		perl -pe "s/\%s\"\)/_PERCENT_S_\"\)/g;" < $^ > $^.tmp; \
		$(NODEJS) $(MAKEBOOKMARK) $^.tmp | perl -pe "s/_PERCENT_S_/\%s/g;" > $@ && \
		rm -f $^.tmp ) \
	|| $(NODEJS) $(MAKEBOOKMARK) $^ > $@

# uncomment rule below to retain contents of $(BUILD)
.SECONDARY: $(BUILD)/fyi-firefox.js $(BUILD)/fyi-ie.js $(BUILD)/fyi-webkit.js

# replace tokens & minify JavaScript
$(BUILD)/%.js: $(SRC)/%.js $(VERSIONTXT) | $(BUILD)
	@perl -pe "s/void\(\'$(VERSIONOLD)\'\)/void\(\'$(VERSIONNEW)\'\)/g;" < $< > $@.tmp || ( \
		echo "*** ERROR with: perl -p -i -e \"s/void\(\'$(VERSIONOLD)\'\)/void\(\'$(VERSIONNEW)\'\)/g;\" $@"; \
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
