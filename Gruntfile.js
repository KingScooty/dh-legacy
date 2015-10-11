module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {

      sass: {
        files: ['assets/sass/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },

      browserify: {
        files: ['public/javascripts/src/**/*.{js,jsx}'],
        tasks: ['browserify']
      },

      livereload: {
        files: ['*.html', 'public/javascripts/dist/**/*.{js,json,hbs}', 'public/stylesheets/*.css',
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
    },

    browserify: {
      options:      {
        transform:  [ require('grunt-react').browserify ]
      },
      dist: {
        files: {
          'public/javascripts/dist/main.bundle.js': ['public/javascripts/src/app.js'],
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/javascripts/dist/main.bundle.min.js': 'public/javascripts/dist/main.bundle.js'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/stylesheets/style.min.css': 'public/stylesheets/style.css'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.registerTask('build', [
    'sass:dist',
    'browserify',
    'uglify',
    'cssmin'
  ]);
};
