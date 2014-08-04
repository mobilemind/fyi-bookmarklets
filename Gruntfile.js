/*global module:false*/
module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['web/'],
    uglify: {
      firefox: { src: ['src/fyi-firefox.js'], dest: 'web/fyi-firefox.js' },
      ie: { src: ['src/fyi-ie.js'], dest: 'web/fyi-ie.js' },
      webkit: { src: ['src/fyi-webkit.js'], dest: 'web/fyi-webkit.js' },
      options: {
        stats: true,
        mangle: true,
        compress: {
          sequences: true,
          properties: true,
          dead_code: true,
          drop_console: true,
          drop_debugger: true,
          unsafe: true,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: false,
          hoist_vars: false,
          if_return: true,
          join_vars: true,
          cascade: true,
          negate_iife: true,
          side_effects: true,
          warnings: true,
          global_defs: {}
          },
        codegen: {
          quote_keys: false,
          space_colon: false,
          max_line_len: 32766,
          ie_proof: false,
          bracketize: false,
          comments: false,
          semicolons: true
        },
        report: 'min'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/fyi-*.js'],
      options: {
        es3: true,
        freeze: true,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        strict: true,
        trailing: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        lastsemic: true,
        scripturl: true,
        browser: true
      }
    },
   js2uri:  {
      options: {
        useNewlineEOL: true,
        useSingleQuote: true,
        noLastSemicolon: true,
        appendVoid: true,
        appendVersion: true
      },
      firefox: { src: ['web/fyi-firefox.js'], dest: 'web/fyi-firefox.js' },
      ie: { src: ['web/fyi-ie.js'], dest: 'web/fyi-ie.js' },
      webkit: { src: ['web/fyi-webkit.js'], dest: 'web/fyi-webkit.js' }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('js2uri');

  grunt.log.writeln('\n' + grunt.config('pkg.name') + ' ' + grunt.config('pkg.version'));

  grunt.registerTask('version-suffix', 'add suffix to version', function(bookmarklet, suffix) {
    var jsString = grunt.file.read(bookmarklet).replace(':%25s?', ':%s?');
    if ('' === jsString) grunt.fail.fatal("Can't read from " + bookmarklet);
    jsString = jsString.replace(grunt.config('pkg.version'), grunt.config('pkg.version') + suffix);
    if (grunt.file.write(bookmarklet, jsString)) {
      return grunt.log.writeln(bookmarklet + ' (' + jsString.length + ' bytes)');
    }
    else grunt.fail.fatal("Can't write to " + bookmarklet);
  });

  grunt.registerTask('firefox', 'process firefox', function() {
    return grunt.task.run(['uglify:firefox', 'js2uri:firefox', 'version-suffix:web/fyi-firefox.js:ff']);
  });

  grunt.registerTask('ie', 'process IE', function() {
    return grunt.task.run(['uglify:ie', 'js2uri:ie', 'version-suffix:web/fyi-ie.js:ie']);
  });

  grunt.registerTask('webkit', 'process WebKit', function() {
    return grunt.task.run(['uglify:webkit', 'js2uri:webkit', 'version-suffix:web/fyi-webkit.js:wk']);
  });

  // test task
  grunt.registerTask('test', ['jshint', 'firefox', 'ie', 'webkit']);

  // Default task
  grunt.registerTask('default', ['clean', 'jshint', 'firefox', 'ie', 'webkit']);

};
