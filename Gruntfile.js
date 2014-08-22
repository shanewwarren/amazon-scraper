module.exports = function(grunt) {

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin to run node scripts.
  grunt.loadNpmTasks('grunt-execute');

  // Load the plugin to allow us to run shell commands.
  grunt.loadNpmTasks('grunt-shell');

    // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
        all: ["lib/**/*.js"]
    },

    execute: {
        dev: {
            src: ['lib/threads.js']
        }
    },

    shell: {
        debug: {
            options: {
                stderr: false
            },
            command: function(script){
              return 'node-debug ' + script;
            }
        }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/threads/**/*.js']
      }
    }

  });


  // Default task(s).
  grunt.registerTask('default', ['jshint:all', 'mochaTest:test']);
};
