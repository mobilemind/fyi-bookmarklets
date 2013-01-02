/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '2.5.1'
    },
    lint: {
      files: ['grunt.js', 'src/*.js']
    },
    min: {
         dist: {
           src: ['src/fyi-firefox.js'],
           dest: 'web/fyi-firefox.js'
         }
    },
    uglify: {
      mangle: {toplevel: false},
      squeeze: {'sequences': false, 'conditionals': false, 'hoist_vars': true},
      codegen: {quote_keys: false}
    },
    watch: {
      files: ['grunt.js', 'src/*.js'],
      tasks: 'lint'
    },
    jshint: {
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
      },
      globals: {}
    },
   js2uri:  {
      options: {
        useNewlineEOL: true,
        useSingleQuote: true,
        noLastSemicolon: true,
        appendVoid: true,
        appendVersion: true
      },
      dist: {
        src: ['web/fyi-webkit.js'],
        dest: 'web/fyi-webkit.js'
      }
    }
  });

  grunt.loadNpmTasks('js2uri');

  grunt.registerTask('firefox', 'setup for firefox', function() {
    // set files (both set to the same for Firefox)
    var myDist = {src: ['web/fyi-firefox.js'], dest: 'web/fyi-firefox.js'};
    grunt.config('min.dist', myDist);
    grunt.config('js2uri.dist', myDist);

    // special pre-processing for firefox
    // note hardcoded path below (read from src, write to dest)
    var jsString = grunt.file.read('src/fyi-firefox.js').replace("('%s')", "('PERCENT_S')");
    grunt.file.write(myDist.dest, jsString);

    // process it (using dest as src and dest)
    grunt.task.run(['min', 'js2uri', 'firefox-post']);
  });


  grunt.registerTask('firefox-post', 'post-processing for firefox', function() {
    // special post-processing for firefox
    var jsString = grunt.file.read('web/fyi-firefox.js').replace("('PERCENT_S')", "('%s')");
    grunt.file.write('web/fyi-firefox.js', jsString);
  });

  grunt.registerTask('ie', 'process IE', function() {
    // IE set files
    var myDist = {src: ['src/fyi-ie.js'], dest: 'web/fyi-ie.js'};
    grunt.config('min.dist', myDist);
    grunt.config('js2uri.dist', myDist);
    grunt.config('js2uri.dist.src', myDist.dest);
     // process it
    grunt.task.run(['min', 'js2uri']);
  });

  grunt.registerTask('webkit', 'process WebKit', function() {
    // IE set files
    var myDist = {src: ['src/fyi-webkit.js'], dest: 'web/fyi-webkit.js'};
    grunt.config('min.dist', myDist);
    grunt.config('js2uri.dist', myDist);
    grunt.config('js2uri.dist.src', myDist.dest);
    // process it
    grunt.task.run(['min', 'js2uri']);
  });

  // Default task
  grunt.registerTask('default', ['lint', 'webkit', 'ie', 'firefox']);

};
