var utils = require('./tests/utility');

module.exports = function(grunt) {

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin to run node scripts.
  grunt.loadNpmTasks('grunt-execute');

  // Load the plugin to allow us to run shell commands.
  grunt.loadNpmTasks('grunt-shell');

    // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.loadNpmTasks('grunt-prompt');


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

    prompt: {
        fixture: {
          options: {
            questions: [
              {
                config: 'fixture.url',
                type: 'input',
                message: 'Url:',
                default: ''
              },
              {
                config: 'fixture.fixtureName',
                type: 'input',
                message: 'Fixture name:',
                default: 'test-fixture'
              }
            ]
          }
        },
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


  grunt.registerTask('internalFixture',
  'Specify url and fixture name and saves as html into the fixture directory',
   function() {
      var url = grunt.config('fixture.url');
      var fixtureName = grunt.config('fixture.fixtureName');
      var fileName = "test/fixtures/" + fixtureName + ".html";
      utils.createFixtureFromUrl(url, fileName);
      grunt.log.writeln("File written to: " + fileName);
  });

  createFixtureFromUrl = function(url, dest){
    phantom.create(function(err,ph) {
      return ph.createPage(function(err,page) {
        return page.open(url, function(err,status) {
          page.get('content', function (err,html) {

            // write the file to the specified location
            fs.writeFile(dest, html, function (err) {
              if (err) throw err;

              // close the running process
              ph.exit();
            });
          });
        });
      });
    });
  };


  grunt.registerTask('fixture',
  [
    'prompt:fixture',
    'internalFixture'
  ]);

  // Default task(s).
  grunt.registerTask('default', ['jshint:all', 'mochaTest:test']);
};
