module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        "bookmarkletize": {
            "wk": "fyi-webkit.js"
        },
        "eslint": {
            "options": {
              "failOnError": true,
              "ignore": false,
              "overrideConfigFile": ".github/linters/.eslintrc.js"
            },
            "target": [".github/linters/.*.js", "Gruntfile.js", "package.json", "src/*.js"]
        },
        "pkg": grunt.file.readJSON("package.json"),
        "uglify": {
            "options": {
                "compress": {
                    "drop_console": true,
                    "expression": true,
                    "passes": 2,
                    "reduce_vars": false,
                    "toplevel": true,
                    "unsafe": true,
                    "unsafe_comps": true,
                    "unsafe_math": true,
                    "unsafe_proto": true,
                    "unsafe_undefined": true
                },
                "mangle": {
                    "toplevel": true
                },
                "output": {
                    "beautify": false,
                    "indent_level": 0,
                    "quote_style": 1
                },
                "toplevel": true,
                "warnings": true,
                "webkit": true
            },
            "sourceFiles": {
                "files": [{
                    "cwd": "src",
                    "dest": "web",
                    "expand": true,
                    "src": "*.js"
                }]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-eslint");

    // version info
    grunt.log.writeln(`\n${grunt.config("pkg.name")} ${grunt.config("pkg.version")}`);

    grunt.registerMultiTask("bookmarkletize", "make a simple javascript url",
        function() {
            const origFile = `src/${this.data}`,
                thisFile = `web/${this.data}`;
            let theCode = grunt.file.read(thisFile);
            theCode = `${theCode}void'${grunt.config("pkg.version")}${this.target}'`;
            // make javascript URL w/safer URL encoding
            theCode = `javascript:${encodeURIComponent(theCode).replace(/\*/g, "%2A")}`;
            // un-encode a couple of generally safe chars for URLs (& '@' for readability)
            theCode = theCode.replace(/%3A/g, ":");
            theCode = theCode.replace(/%3D/g, "=");
            theCode = theCode.replace(/%40/g, "@");
            grunt.file.write(thisFile, theCode);
            // show some stats
            grunt.log.writeln(`${origFile}: ${grunt.file.read(origFile).length} bytes`);
            grunt.log.writeln(`${thisFile}: ${theCode.length} bytes`);
        }
    );

    // build task
    grunt.registerTask("build", ["uglify", "bookmarkletize"]);

    // lint task
    grunt.registerTask("lint", ["eslint"]);

    // Default task
    grunt.registerTask("default", ["lint", "build"]);
};
