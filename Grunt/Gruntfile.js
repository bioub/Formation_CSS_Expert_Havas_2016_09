module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);

  let company = 'Moi';

  grunt.initConfig({
    replace: {
      dist: {
        options: {
          map: {
            '../node_modules/bootstrap/dist/css/bootstrap.min.css':
              'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            '../node_modules/bootstrap/dist/js/bootstrap.min.js':
              'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
          }
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },
    clean: {
      preDist: 'dist',
      postDist: '.tmp'
    },
    useminPrepare: {
      html: 'src/index.html'
    },
    usemin: {
      html: 'dist/index.html'
    },
    rev: {
      dist: {
        files: {
          src: ['dist/css/*.min.css']
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'src',
        src: '**/*.html',
        dest: 'dist',
      }
    },
    htmlmin: {
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      },
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

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });
  // grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('dist', [
    'clean:preDist',
    'useminPrepare:html',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'copy:dist',
    'rev',
    'usemin:html',
    'replace:dist',
    'clean:postDist'
  ]);

  grunt.registerMultiTask('replace', function() {
    var options = this.options();

    this.files.forEach(function(file) {
      var contenu = grunt.file.read(file.src);

      for (var orig in options.map) {
        var dest = options.map[orig];

        contenu = contenu.replace(orig, dest);
      }

      grunt.file.write(file.dest, contenu);
    });

    grunt.log.write('Replace terminé dans ' + this.files.length + ' fichiers');
  });
};