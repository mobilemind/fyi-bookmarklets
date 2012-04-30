#!/usr/bin/make -f

##
# FYI PROJECT
#

# directories/paths
BUILD := build
LOCALLIB := lib
COMMONLIB := $$HOME/common/lib
VPATH := web:$(BUILD)

# files
PROJWEB := web/fyi-firefox.js web/fyi-ie.js web/fyi-webkit.js
README = README.md

# macros/utils
JSLINTOPTIONS := -nologo -nofilelisting -nosummary
YUILCOMPRESSORPATH := $(shell [[ 'cygwin' == $$OSTYPE ]] &&  echo "`cygpath -w $(COMMONLIB)`\\" || echo "$(COMMONLIB)/")
YUICOMPRESSOR := $(shell type -p yuicompressor || echo "java -jar '$(YUILCOMPRESSORPATH)yuicompressor-2.4.7.jar'")
COMPRESSOPTIONS := --type js --nomunge --disable-optimizations
MAKEBOOKMARK := $(LOCALLIB)/process-js2bookmarkURI.js
VERSIONOLD := $(shell head -n 1 src/VERSIONS.txt)
VERSIONNEW := $(shell tail -n 1 src/VERSIONS.txt)

default: $(PROJWEB) $(README) | $(BUILD) web
	@echo 'Done.'; echo

# update README with pastelet URLS just built
$(README): $(VERSIONTXT) | $(PROJWEB)
	@echo 'Updating README...'
	@perl -pi -e 'BEGIN{open F,"web/fyi-webkit.js";@f=<F>}s#javascript:.*(?=\" title=\"fyi-webkit( |\"))#@f#g;' $@
	@perl -pi -e 'BEGIN{open F,"web/fyi-firefox.js";@f=<F>}s#javascript:.*(?=\" title=\"fyi-firefox\")#@f#g;' $@
	@perl -pi -e 'BEGIN{open F,"web/fyi-ie.js";@f=<F>}s#javascript:.*(?=\" title=\"fyi-ie\")#@f#g;' $@
	@perl -pi -e 's/&body/&amp;body/g;s/&&/&amp;&amp;/g;' $@

# run JSLINT then prepend with 'javascript:' and encodeURI (preserving Firefox '%s' token)
web/%.js: $(BUILD)/%.js | $(BUILD) web
	@echo '   $@'
	@jsl -process $< $(JSLINTOPTIONS) > /dev/null ; [ $$? -lt 2 ] || ( \
		echo '*** ERROR: $^'; jsl -process $< $(JSLINTOPTIONS); \
		exit 1)
ifneq ($(@F),fyi-firefox.js)
	@(perl -pe 's/\%s\"\)/_PERCENT_S_\"\)/g;' < $^ > $^.tmp; \
		node $(MAKEBOOKMARK) $^.tmp | perl -pe "s/_PERCENT_S_/\%s/g;s/\%22/'/g;s/void%20/void/g;s/;$$//g;" | tr -d "\n" > $@ && \
		rm -f $^.tmp || ( \
			echo '*** ERROR with: node $(MAKEBOOKMARK)... ($(@F))'; \
			exit 1 ))
else
	@node $(MAKEBOOKMARK) $^ | perl -pe "s/\%22/'/g;s/void%20/void/g;s/;$$//g;" | tr -d "\n" > $@ || ( \
		echo "*** ERROR with: node $(MAKEBOOKMARK) $^ > $@"; \
		exit 1 )
endif

# uncomment '.SECONDARY' rule below to retain contents of $(BUILD)
#.SECONDARY: $(BUILD)/fyi-firefox.js $(BUILD)/fyi-ie.js $(BUILD)/fyi-webkit.js

# replace tokens & minify JavaScript
$(BUILD)/%.js: src/%.js $(VERSIONTXT) | $(BUILD)
	@perl -pe "s/void\(\'$(VERSIONOLD)\'\)/void\(\'$(VERSIONNEW)\'\)/g;" < $< > $@.tmp || ( \
		echo "*** ERROR with: perl -p -i -e \"s/void\(\'$(VERSIONOLD)\'\)/void\(\'$(VERSIONNEW)\'\)/g;\" $@"; \
		exit 1 )
	@$(YUICOMPRESSOR) $(COMPRESSOPTIONS) -o $@ $@.tmp || ( \
		echo '*** ERROR with: $(YUICOMPRESSOR) $(COMPRESSOPTIONS) -o $@ $^'; \
		exit 1 )
	@rm -f $@.tmp

.PHONY: $(BUILD)
$(BUILD):
	@[[ -d $(BUILD) ]] || mkdir -m 744 $(BUILD)

.PHONY: web
web:
	@[[ -d web ]] || mkdir -m 744 web

.PHONY: deploy
deploy: default
	@echo 'Commit changes. Then do- git checkout gh-pages && make deploy && git checkout master'

.PHONY: clean
clean:
	@echo 'Cleaning build directory and web directory...'
	@rm -rf $(BUILD)/* web/*; touch src/VERSIONS.txt
