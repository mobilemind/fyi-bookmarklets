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
                "useNewlineEOL": true,
                "useSingleQuote": true,
                "appendVoid": true,
                "customVersion": '',
                "appendVersion": true,
                "noLastSemicolon": true,
                "forceLastSemicolon": false
            }
        },
        "pkg": grunt.file.readJSON("package.json"),
        "uglify": {
            "options": {
                "stats": true,
                "maxLineLen": 32766,
                "mangle": {
                    "sort": true,
                    "toplevel": true
                },
                "compress": {
                    "sequences": true,
                    "properties": true,
                    "dead_code": true,
                    "drop_console": true,
                    "drop_debugger": true,
                    "unsafe": true,
                    "conditionals": true,
                    "comparisons": true,
                    "evaluate": true,
                    "booleans": true,
                    "loops": true,
                    "unused": true,
                    "hoist_funs": false,
                    "hoist_vars": false,
                    "if_return": true,
                    "join_vars": true,
                    "cascade": true,
                    "warnings": true,
                    "negate_iife": true,
                    "side_effects": true,
                    "global_defs": {}
                },
                "codegen": {
                    "quote_keys": false,
                    "space_colon": false,
                    "max_line_len": 32766,
                    "ie_proof": false,
                    "bracketize": false,
                    "comments": false,
                    "semicolons": true
                },
                "report": "min"
            },
            "sourceFiles": {
                "files": [{
                    "expand": true,
                    "cwd": "src",
                    "src": "*.js",
                    "dest": "web"
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
