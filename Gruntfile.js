module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      build: {    
        options: {
          compress: true,
          optimization: 2
        },  
        files: {
          'style.css': 'assets/less/styles.less'
        }     
      }
    },

    uglify: {
      dist: {
        src: 'assets/js/*',
        dest: 'main.js'
      }
    },

    watch: {
      less: {
        files: 'assets/less/*',
        tasks: ['less']
      },
      uglify: {
        files: 'assets/js/*',
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['less','uglify']);
  grunt.registerTask('default', ['watch']);

}