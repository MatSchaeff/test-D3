module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['jquery.js',
                    'd3.v3.js',
                    'nxViewer.js'
                ],
                dest: 'demo/featureViewer.bundle.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    livereload: true,
                    base: '.'
                }
            }
        },
        watch: {
            all: {
                options: {livereload: true},
                files: ['js/*.js']
            },
            handlebars: {
                files: 'templates/*.tmpl',
                tasks: ['handlebars:compile']
            }
        },
        handlebars: {
            compile: {
                src: 'templates/*.tmpl',
                dest: 'js/gist_templates.js',
                options: {
                    namespace: "HBtemplates"
                }
            }
        }
    });



    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('hbs', ['handlebars:compile']);
    grunt.registerTask('serve', ['connect:server','watch']);

};