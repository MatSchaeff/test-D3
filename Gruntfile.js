module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['nextprot.js',
                    'script2.js'
                ],
                dest: 'dependencies.js'
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
                files: ['*.js']
            },
            handlebars: {
                files: '*.tmpl',
                tasks: ['handlebars:compile']
            }
        },
        handlebars: {
            compile: {
                src: '*.tmpl',
                dest: 'gist_templates.js',
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