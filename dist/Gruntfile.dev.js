"use strict";

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          'dev/styles/main.css': 'src/styles/main.less'
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.less'
        }
      }
    },
    watch: {
      less: {
        files: ['src/styles/**/*.less'],
        tasks: ['less:development']
      },
      html: {
        files: ['src/index.html'],
        tasks: ['replace:dev']
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [{
            match: 'ENDERECO_DO_CSS',
            replacement: './styles/main.css'
          }, {
            match: 'ENDERECO_DO_JS',
            replacement: '../src/scripts/main.js'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['src/index.html'],
          dest: 'dev/'
        }]
      },
      dist: {
        options: {
          patterns: [{
            match: 'ENDERECO_DO_CSS',
            replacement: './styles/main.min.css'
          }, {
            match: 'ENDERECO_DO_JS',
            replacement: './scripts/main.min.js'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['src/index.html'],
          dest: 'prebuild/' // Use 'prebuild/' como diretório temporário

        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComents: true,
          collapseWhitespace: true
        },
        files: {
          'prebuild/index.html': 'src/index.html'
        }
      }
    },
    clean: ['prebuild'],
    uglify: {
      target: {
        files: {
          'dist/scripts/main.min.js': 'src/scripts/main.js'
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'prebuild/',
        // Use 'prebuild/' como diretório de origem
        src: '*.html',
        dest: 'dist/' // Use 'dist/' como diretório de destino

      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy'); // Carregue a tarefa 'copy'

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify', 'copy']); // Adicione 'copy' às tarefas de construção
};
//# sourceMappingURL=Gruntfile.dev.js.map
