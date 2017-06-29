/* global module:false */
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        "bookmarkletize": {
            "ff": "fyi-firefox.js",
            "ie": "fyi-ie.js",
            "wk": "fyi-webkit.js"
        },
        "clean": {
            "web": ["web/*.js"],
            "web_maps": ["web/*.map"]
        },
        "eslint": {
            "options": {"configFile": ".eslintrc.yml"},
            "target": ["Gruntfile.js", "src/*.js"]
        },
        "pkg": grunt.file.readJSON("package.json"),
        "shell": {
            "mkdir_web": {"command": "[[ -d web ]] || mkdir web"},
            "uglify_es": {"command": "for FYIJS in src/fyi-*.js; do uglifyjs --config-file .uglifyjs3.json --output \"web/$(basename \"$FYIJS\")\" \"$FYIJS\" ; done"}
        },
        "yamllint": {"files": {"src": [".*.yml", "*.yml", "*.yaml"]}}
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-yamllint");
    grunt.loadNpmTasks("grunt-shell");

    grunt.log.writeln(`\n${grunt.config("pkg.name")} ${grunt.config("pkg.version")}`);

    grunt.registerMultiTask("bookmarkletize", "make a simple javascript url",
        function() {
            const origFile = `src/${this.data}`,
                thisFile = `web/${this.data}`;
            let theCode = grunt.file.read(thisFile);
            theCode = `javascript:${theCode.replace(/\+/g,"%2B")}`;
            theCode += `void'${grunt.config("pkg.version")}${this.target}'`;
            grunt.file.write(thisFile, theCode);
            grunt.log.writeln(`${origFile}: ${grunt.file.read(origFile).length} bytes`);
            grunt.log.writeln(`${thisFile}: ${grunt.file.read(thisFile).length} bytes`);
        }
    );

    // preflight task
    grunt.registerTask("preflight", ["yamllint", "eslint", "shell:mkdir_web"]);

    // test task
    grunt.registerTask("test", ["preflight", "shell:uglify_es", "bookmarkletize"]);

    // Default task
    grunt.registerTask("default", ["clean", "test", "clean:web_maps"]);

};
