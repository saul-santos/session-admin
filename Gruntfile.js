module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            target: {
                src: 'public/index.html'
            }
        },
        uglify: {
            app: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> Created by: Saúl Santos */\n'
                },
                files: {
                    'public/dist/<%= pkg.name %>.min.js': ['public/app.module.js', 'public/app/**/*.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
