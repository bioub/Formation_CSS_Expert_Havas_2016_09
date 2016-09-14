module.exports = function(grunt) {

  require('time-grunt')(grunt);

  let company = 'Moi';

  grunt.initConfig({
    copy: {
      dist: {
        expand: true,
        cwd: 'src',
        src: '**/*.html',
        dest: 'dist',
      }
    },
    cssmin: {
      dist: {
        src: ['src/css/**/*.css'],
        dest: 'dist/css/app.min.css'
      }
    },
    less: {
      options: {
        banner: `/*! Copyright ${company} ${(new Date()).getFullYear()} */`
      },
      dev: {
        expand: true,
        cwd: 'src/less',
        src: '**/*.less',
        dest: 'src/css',
        rename: function(destPath, srcPath) {
          return destPath + '/' + srcPath.replace('.less', '.css');
        }
      }
    },
    watch: {
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['newer:less:dev']
      }
    }
  });

  require('jit-grunt')(grunt);
  // grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-newer');

};