module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        "bookmarkletize": {
            "ff": "fyi-firefox.js",
            "ie": "fyi-ie.js",
            "wk": "fyi-webkit.js"
        },
        "pkg": grunt.file.readJSON("package.json"),
        "shell": {
            "mkdir_web": {"command": "(mkdir 'web' || true)"},
            "uglify_es": {"command": "for FYIJS in src/fyi-*.js; do uglifyjs --config-file .uglifyjs3.json --output \"web/$(basename \"$FYIJS\")\" \"$FYIJS\" ; done"}
        }
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-shell");

    grunt.log.writeln(`\n${grunt.config("pkg.name")} ${grunt.config("pkg.version")}`);

    grunt.registerMultiTask("bookmarkletize", "make a simple javascript url",
        function() {
            const origFile = `src/${this.data}`,
                thisFile = `web/${this.data}`;
            let theCode = grunt.file.read(thisFile);
            // minimal URL encoding
            theCode = theCode.replace(/\+/g,"%2B");
            // prepend + append & write results
            theCode = `javascript:${theCode}void'${grunt.config("pkg.version")}${this.target}'`;
            grunt.file.write(thisFile, theCode);
            // show some stats
            grunt.log.writeln(`${origFile}: ${grunt.file.read(origFile).length} bytes`);
            grunt.log.writeln(`${thisFile}: ${theCode.length} bytes`);
        }
    );

    // preflight task
    grunt.registerTask("preflight", ["shell:mkdir_web"]);

    // test task
    grunt.registerTask("test", ["preflight", "shell:uglify_es", "bookmarkletize"]);

    // Default task
    grunt.registerTask("default", ["test"]);

};
