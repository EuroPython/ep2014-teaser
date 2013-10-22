module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                sassDir: 'app/assets/sass',
                cssDir: 'app/assets/css',
                imagesDir: 'app/assets/images'
            },
            server: {},
            clean: {
                options: {
                    clean: true
                }
            }
        },
        connect: {
            livereload: {
                options: {
                    open: true
                }
            },
            options: {
                port: 9000,
                base: "app",
                livereload: 35729
            }
        },
        watch: {
            compass: {
                files: ['app/assets/sass/*.scss'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/assets/css/*.css',
                    'app/assets/images/*',
                    'app/index.html'
                ]
            }
        },
        concurrent: {
            server: ['compass:server']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['server']);

    grunt.registerTask('server', function(target) {
        grunt.task.run([
            'clean',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ])
    });

    grunt.registerTask('clean', ['compass:clean']);
};