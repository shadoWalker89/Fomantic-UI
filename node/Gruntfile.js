module.exports = function(grunt) {
  var
    tasks = [
      // compiles less
      'less:buildCSS',

      // copies assets and js over to build dir
      'copy:toBuild',

      // creates minified css of each
      'cssmin:minifyCSS',

      // creates release css of all together
      'cssmin:buildReleaseCSS',

      // creates minified js of each
      'uglify:minifyJS',

      // creates release js of all together
      'uglify:buildReleaseJS',

      // copies files over to docs
      'copy:toDocs'
    ],
    config
  ;

  config = {

    package: grunt.file.readJSON('package.json'),

    // watches for changes in a source folder
    watch: {
      scripts: {
        files: [
          '../src/**/*.less'
        ],
        tasks : tasks
      }
    },

    less: {
      buildCSS: {
        options: {
          paths: ['../build']
        },
        expand : true,
        cwd    : '../src',
        src    : [
          '**/*.less'
        ],
        dest : '../build/uncompressed',
        ext  : '.css'
      }
    },

    copy: {
      toBuild: {
        files: [
          {
            expand : true,
            cwd    : '../src/',
            src    : [
              '**/*.js',
              'images/*',
              'fonts/*'
            ],
            dest : '../build/uncompressed'
          },
          {
            expand : true,
            cwd    : '../src/',
            src    : [
              '**/*.js',
              'images/*',
              'fonts/*'
            ],
            dest : '../build/minified'
          },
          {
            expand : true,
            cwd    : '../src/',
            src    : [
              '**/*.js',
              'images/*',
              'fonts/*'
            ],
            dest : '../build/packaged'
          }
        ]
      },
      toDocs: {
        files: [
          {
            expand : true,
            cwd    : '../build',
            src    : [
              '**'
            ],
            dest   : 'src/files/components/semantic/'
          }
        ]
      }
    },

    cssmin: {

      minifyCSS: {
        expand : true,
        cwd    : '../build/uncompressed',
        src    : [
          '**/*.css'
        ],
        dest : '../build/minified',
        ext  : '.min.css'
      },

      buildReleaseCSS: {
        options : {
          banner : '' +
          '/*\n' +
          '* # <%= package.semantic.name %>\n' +
          '* Version: <%= package.semantic.version %>\n' +
          '* http://github.com/quirkyinc/semantic\n' +
          '*\n' +
          '*\n' +
          '* Copyright <%= grunt.template.today("yyyy") %> Contributors\n' +
          '* Released under the MIT license\n' +
          '* http://opensource.org/licenses/MIT\n' +
          '*\n' +
          '* Released: <%= grunt.template.today("mm/dd/yyyy") %>\n' +
          '*/\n'
        },
        files: {
          '../build/packaged/semantic.min.css': [
            '../build/uncompressed/**/*.css'
          ]
        }
      }
    },

    uglify: {

      minifyJS: {
        expand : true,
        cwd    : '../build/uncompressed',
        src    : [
          '**/*.js'
        ],
        dest : '../build/minified',
        ext  : '.min.js'
      },

      buildReleaseJS: {
        options: {
          mangle   : true,
          compress : true,
          banner   : '' +
            '/*' +
            '* # <%= package.semantic.name %>\n' +
            '* Version: <%= package.semantic.version %>\n' +
            '* http://github.com/quirkyinc/semantic\n' +
            '*\n' +
            '*\n' +
            '* Copyright <%= grunt.template.today("yyyy") %> Contributors\n' +
            '* Released under the MIT license\n' +
            '* http://opensource.org/licenses/MIT\n' +
            '*\n' +
            '* Released: <%= grunt.template.today("mm/dd/yyyy") %>\n' +
            '*/\n'
        },
        files: {
          '../build/packaged/semantic.min.js': [
            '../build/uncompressed/**/*.js'
          ]
        }
      }
    }

  };


  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-css');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig(config);

  // add watch task to default task
  tasks.push('watch');
  grunt.registerTask('default', tasks);
};
