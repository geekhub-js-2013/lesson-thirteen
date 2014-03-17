module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            bower: ['public/bower_components'],
            js: ['public/js'],
            css: ['public/css']
        },
        less: {
            options: {
                sourceMap: true,
                sourceMapFilename: 'public/css/main.css.map',
                sourceMapURL: 'main.css.map',
                sourceMapBasepath: 'web/css'
            },
            dev: {
                files: {
                    "public/css/main.css": "web/css/main.less"
                }
            },
            dist: {
                options: {
                    compress: true
                },
                files: {
                    "public/css/main.css": "web/css/main.less"
                }
            }
        },
        copy: {
            bower: {
                files: [
                    {expand: true, cwd: 'web/bower_components', src: ['**'], dest: 'public/bower_components'}
                ]
            },
            js: {
                files: [
                    {expand: true, cwd: 'web/js', src: ['**'], dest: 'public/js'}
                ]
            },
            css: {
                files: [
                    {expand: true, cwd: 'web/css', src: ['**'], dest: 'public/css'}
                ]
            }
        },
        requirejs: {
            options: {
                baseUrl: 'web/js',
                name: '../bower_components/requirejs/require',
                mainConfigFile: 'web/js/main.js',
                include: ['main'],
                findNestedDependencies: false,
                cjsTranslate: false,
                generateSourceMaps: true,
                preserveLicenseComments: false,
                out: 'public/js/build.js'
            },
            dev: {
                options: {
                    optimize: 'none'
                }
            },
            dist: {
                options: {
                    optimize: 'uglify2'
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'public/index.html': ['web/index.html']
                }
            }
        },
        watch: {
            js: {
                files: ['web/js/*'],
                tasks: ['clean:js', 'copy:js', 'requirejs:dev']
            },
            less: {
                files: ['web/css/*'],
                tasks: ['clean:css', 'copy:css', 'less:dev']
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-less');

    //Tasks
    grunt.registerTask('default', ['clean', 'less:dev', 'copy', 'requirejs:dev', 'processhtml']);
    grunt.registerTask('dist', ['clean', 'less:dist', 'copy', 'requirejs:dist', 'processhtml']);
};
