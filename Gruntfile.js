/*global module:false*/
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        "addsuffix": {
            "ff": "fyi-firefox.js",
            "ie": "fyi-ie.js",
            "wk": "fyi-webkit.js"
        },
        "clean": ['web/'],
        "eslint": {
            "options": {"configFile": ".eslintrc.yml"},
            "target": ["Gruntfile.js", "src/*.js"]
        },
        "js2uri": {
            "options": {
                "appendVersion": true,
                "appendVoid": true,
                "customVersion": '',
                "forceLastSemicolon": false,
                "noLastSemicolon": true,
                "useNewlineEOL": true,
                "useSingleQuote": true
            }
        },
        "pkg": grunt.file.readJSON("package.json"),
        "uglify": {
            "options": {
                "codegen": {
                    "bracketize": false,
                    "comments": false,
                    "ie_proof": false,
                    "max_line_len": 32766,
                    "quote_keys": false,
                    "semicolons": true,
                    "space_colon": false
                },
                "compress": {
                    "booleans": true,
                    "cascade": true,
                    "comparisons": true,
                    "conditionals": true,
                    "dead_code": true,
                    "drop_console": true,
                    "drop_debugger": true,
                    "evaluate": true,
                    "global_defs": {},
                    "hoist_funs": false,
                    "hoist_vars": false,
                    "if_return": true,
                    "join_vars": true,
                    "loops": true,
                    "negate_iife": true,
                    "properties": true,
                    "sequences": true,
                    "side_effects": true,
                    "unsafe": true,
                    "unused": true,
                    "warnings": true
                },
                "mangle": {"toplevel": true},
                "maxLineLen": 32766,
                "report": "min",
                "stats": true
            },
            "sourceFiles": {
                "files": [{
                    "cwd": "src",
                    "dest": "web",
                    "expand": true,
                    "src": "*.js"
                }]
            }
        },
        "yamllint": {"files": {"src": [".*.yml", "*.yml", "*.yaml"]}}
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("js2uri");
    grunt.loadNpmTasks("grunt-yamllint");

    grunt.log.writeln("\n" + grunt.config("pkg.name") + ' ' + grunt.config("pkg.version"));

    grunt.registerMultiTask("addsuffix", "add suffix to version", function() {
        grunt.config.set("js2uri.options.customVersion", grunt.config("pkg.version") + this.target);
        grunt.config.set("js2uri.files.src", ["web/" + this.data]);
        grunt.config.set("js2uri.files.dest", "web/" + this.data);
        if (!grunt.task.run(["js2uri"])) {
            grunt.fail.fatal("Failed to js2uri() web/" + this.data);
        }
        return grunt.log.writeln(this.data + " (" + grunt.file.read("web/" + this.data).length + " bytes)");
    });

    grunt.registerTask("fixfirefoxjs", "fix %s encoding in firefox script", function() {
        const foxjs = "web/fyi-firefox.js",
            jsString = grunt.file.read(foxjs).replace(/%25s/g, "%s");
        if (!jsString || 0 === jsString.length) {
            grunt.fail.fatal("Can't read from " + foxjs);
        }
        if (!grunt.file.write(foxjs, jsString)) {
            grunt.fail.fatal("Can't write to " + foxjs);
        }
        return grunt.log.writeln(foxjs + " (" + jsString.length + " bytes)");
    });

    // test task
    grunt.registerTask("test", ["yamllint", "eslint", "uglify:sourceFiles", "addsuffix", "fixfirefoxjs"]);

    // Default task
    grunt.registerTask("default", ["clean", "test"]);

};
