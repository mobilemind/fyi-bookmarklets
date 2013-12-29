/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '2.5.1'
    },
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
      files: ['grunt.js', 'src/*.js'],
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

  grunt.registerTask('firefox', 'process firefox', function() {
    grunt.task.run(['uglify:firefox', 'js2uri:firefox', 'firefox-post']);
  });

  grunt.registerTask('firefox-post', 'post-process firefox', function() {
    // special post-processing for firefox
    var jsString = grunt.file.read('web/fyi-firefox.js').replace(':%25s?', ':%s?');
    grunt.file.write('web/fyi-firefox.js', jsString);
    grunt.log.writeln('web/fyi-firefox.js (' + jsString.length + ' bytes)');
  });

  grunt.registerTask('ie', 'process IE', function() {
    grunt.task.run(['uglify:ie', 'js2uri:ie']);
  });

  grunt.registerTask('webkit', 'process WebKit', function() {
    grunt.task.run(['uglify:webkit', 'js2uri:webkit']);
  });

  // Default task
  grunt.registerTask('default', ['jshint', 'firefox', 'ie', 'webkit']);

};
