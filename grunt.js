/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '2.1.0',
      banner: '/*! fyi-bookmarklets - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://github.com/mobilemind/fyi-bookmarklets/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Tom King; Licensed MIT */'
    },
    lint: {
      files: ['grunt.js', 'src/*.js']
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', 'src/fyi-firefox.js'],
        dest: 'dist/fyi-firefox.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: false,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint min');

};
