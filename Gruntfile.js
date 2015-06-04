module.exports = function(grunt) {

  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');
  var exec = require('child_process').exec;

  grunt.initConfig({
    // watch: {
    //   legistar_web_js: {
    //     files: 'frontend/legistar/react/**/*.jsx',
    //     tasks: ['legistar_web_js']
    //   },
    //   legistar_web_css: {
    //     files: 'frontend/legistar/less/**/*.less',
    //     tasks: ['legistar_web_css']
    //   },
    //   legistar_web_test: {
    //     files: ['frontend/legistar/__tests__/**/*.js', 'frontend/legistar/react/**/*.jsx'],
    //     tasks: ['legistar_web_react_test']
    //   }
    // },
    // concurrent: {
    //   legistar_web: {
    //     tasks: ['watch:legistar_web_js', 'watch:legistar_web_css'],
    //     options: {
    //       logConcurrentOutput: true
    //     }
    //   }
    // },
    clean: {
      options: { force: true },
      default: ['frontend_app/generated/']
    },
    react: {
      default: {
        files: [{
          expand: true,
          cwd: 'frontend_app/react',
          src: ['**/*.jsx'],
          dest: 'frontend_app/generated',
          ext: '.js'
        }]
      }
    },
    connect: {
      default: {
        port: 8080,
        base: 'frontend_app/public'
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-connect');

  /*
   * To whomever reads this task:
   *
   * I'm sorry.
   * This exists because grunt-browserify is stupid.  */
  grunt.registerTask('browserify', function() {
    var done = this.async();

    (function(callback) {
      glob('frontend_app/generated/**/*.js', function(err, files) {
        var aliases = [];

        files.forEach(function(file) {
          // everything after react/ without the js extension
          var alias = file.split('frontend_app/generated/')[1].replace('.js', '');
          // var alias = file.replace('.js', '');

          aliases.push('./' + file + ':' + alias);
        });

        callback(aliases);
      });
    })(function(aliases) {
      var command = 'bash -c "browserify -r ' + aliases.join(' -r ') + ' -r react -r marty -r jquery > frontend_app/public/js/app.js"';
      var child = exec(command, function(error, stdout, stderr) {
        if(error) {
          done(false);
        } else {
          done();
        }
      });

      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    });
  });

  grunt.registerTask('compile', ['clean', 'react', 'browserify']);
  grunt.registerTask('server', ['connect']);

  grunt.registerTask('default', 'compile');
}
