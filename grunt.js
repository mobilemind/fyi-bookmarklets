/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '1.4.1'
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
    // set files
    var myDist = {src: ['src/fyi-firefox.js'], dest: 'web/fyi-firefox.js'};
    grunt.config('min.dist', myDist);
    grunt.config('js2uri.dist', myDist);
    grunt.config('js2uri.dist.src', myDist.dest);

    // special pre-processing for firefox
    var tokenStr = "('%s')";
    var placeholder = "('PERCENT_S')";
    var jsString = grunt.file.read(myDist.src[0]).replace(tokenStr, placeholder);
    console.log('jsString:' + jsString);
    console.log('myDist.src:' + myDist.src);
    grunt.file.write(myDist.src[0], jsString);

    // process it
    grunt.task.run(['min', 'js2uri']);

    // special post-processing for firefox
    jsString = grunt.file.read(myDist.dest).replace(placeholder, tokenStr);
    console.log('jsString:' + jsString);
    console.log('myDist.dest:' + myDist.dest);
    grunt.file.write(myDist.dest, jsString);
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
