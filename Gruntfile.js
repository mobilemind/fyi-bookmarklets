/*global module:false*/
module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      firefox: {
        src: ['src/fyi-firefox.js'],
        dest: 'web/fyi-firefox.js'
      },
      ie: {
        src: ['src/fyi-ie.js'],
        dest: 'web/fyi-ie.js'
      },
      webkit: {
        src: ['src/fyi-webkit.js'],
        dest: 'web/fyi-webkit.js'
      },
      options: {
        compress: {
          sequences: true,
          properties: true,
          dead_code: true,
          drop_debugger: true,
          unsafe: false,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: false,
          hoist_vars: false,
          if_return: true,
          join_vars: true,
          cascade: true,
          warnings: true
          },
        codegen: {quote_keys: false},
        report: 'min'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/fyi-*.js'],
      options: {
        strict: false,
        latedef: true,
        noarg: true,
        noempty: true,
        trailing: true,
        unused: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        evil: true,
        lastsemic: true,
        multistr: true,
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
      firefox: {
        src: ['web/fyi-firefox.js'],
        dest: 'web/fyi-firefox.js'
      },
      ie: {
        src: ['web/fyi-ie.js'],
        dest: 'web/fyi-ie.js'
      },
      webkit: {
        src: ['web/fyi-webkit.js'],
        dest: 'web/fyi-webkit.js'
      }
    }
  });

  // Load "jshint" plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load "uglify" plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load "js2uri" plugin
  grunt.loadNpmTasks('js2uri');

  // default version to metadata version OR pkg.version if available
  var fyi_pkgVersion = '';
  if (undefined !== grunt.config('meta.version')) fyi_pkgVersion = grunt.config('meta.version');
  else if (undefined !== grunt.config('pkg.version')) fyi_pkgVersion = grunt.config('pkg.version');
  grunt.log.writeln('\n' + grunt.config('pkg.name') + ' ' + fyi_pkgVersion);

  grunt.registerTask('firefox', 'process firefox', function() {
    grunt.task.run(['uglify:firefox', 'js2uri:firefox', 'post-firefox']);
  });

  grunt.registerTask('post-firefox', 'post-process firefox', function() {
    var jsString = grunt.file.read('web/fyi-firefox.js').replace(':%25s?', ':%s?');
    jsString = jsString.replace(fyi_pkgVersion, fyi_pkgVersion + 'ff');
    grunt.file.write('web/fyi-firefox.js', jsString);
    grunt.log.writeln('web/fyi-firefox.js (' + jsString.length + ' bytes)');
  });

  grunt.registerTask('ie', 'process IE', function() {
    grunt.task.run(['uglify:ie', 'js2uri:ie', 'post-ie']);
  });

  grunt.registerTask('post-ie', 'post-process IE', function() {
		var jsString = grunt.file.read('web/fyi-ie.js').replace(fyi_pkgVersion, fyi_pkgVersion + "ie");
    grunt.file.write('web/fyi-ie.js', jsString);
    grunt.log.writeln('web/fyi-ie.js (' + jsString.length + ' bytes)');
  });

  grunt.registerTask('webkit', 'process WebKit', function() {
    grunt.task.run(['uglify:webkit', 'js2uri:webkit', 'post-webkit']);
  });

  grunt.registerTask('post-webkit', 'post-process WebKit', function() {
		var jsString = grunt.file.read('web/fyi-webkit.js').replace(fyi_pkgVersion, fyi_pkgVersion + "wk");
    grunt.file.write('web/fyi-webkit.js', jsString);
    grunt.log.writeln('web/fyi-webkit.js (' + jsString.length + ' bytes)');
  });

  // Default task
  grunt.registerTask('default', ['jshint', 'firefox', 'ie', 'webkit']);

};
