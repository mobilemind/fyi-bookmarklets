/* global module:false */
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        "addsuffix": {
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

    grunt.registerMultiTask("shelluglifyes", "shell to uglify-es", () => {
        grunt.config.set("js2uri.options.customVersion", grunt.config("pkg.version") + this.target);
        const thisPath = `web/${this.data}`;
        grunt.config.set("js2uri.files.src", [thisPath]);
        grunt.config.set("js2uri.files.dest", thisPath);
        if (!grunt.task.run(["js2uri"])) {
            grunt.fail.fatal(`Failed to js2uri() ${thisPath}`);
        }
        return grunt.log.writeln(`${this.data} (${grunt.file.read(thisPath).length} bytes)`);
    });

    grunt.registerMultiTask("addsuffix", "add suffix to version", () => {
        grunt.config.set("js2uri.options.customVersion", grunt.config("pkg.version") + this.target);
        const thisPath = `web/${this.data}`;
        grunt.config.set("js2uri.files.src", [thisPath]);
        grunt.config.set("js2uri.files.dest", thisPath);
        if (!grunt.task.run(["js2uri"])) {
            grunt.fail.fatal(`Failed to js2uri() ${thisPath}`);
        }
        return grunt.log.writeln(`${this.data} (${grunt.file.read(thisPath).length} bytes)`);
    });

    grunt.registerTask("fixfirefoxjs", "fix %s encoding in firefox script", () => {
        const foxjs = "web/fyi-firefox.js",
            jsString = grunt.file.read(foxjs).replace(/%25s/g, "%s");
        if (!jsString || 0 === jsString.length) {
            grunt.fail.fatal(`Can't read from ${foxjs}`);
        }
        if (!grunt.file.write(foxjs, jsString)) {
            grunt.fail.fatal(`Can't write to ${foxjs}`);
        }
        return grunt.log.writeln(`${foxjs} (${jsString.length} bytes)`);
    });

    // test task
    grunt.registerTask("test", ["yamllint", "eslint", "shell:mkdir_web", "shell:uglify_es", "clean:web_maps"]);

    // Default task
    grunt.registerTask("default", ["clean", "test"]);

};
