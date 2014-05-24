module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['assets/sass/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },
      livereload: {
        files: ['*.html', 'public/javascripts/**/*.{js,json,hbs}', 'public/stylesheets/css/*.css',
        'public/images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/stylesheets/style.css': 'assets/sass/main.scss'
        }
      }
    }
  });
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};