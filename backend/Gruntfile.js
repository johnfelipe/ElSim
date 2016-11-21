'use strict';
/**
 * File to tell Grunt what to do.
 * @module Gruntfile
 */
module.exports = function (grunt) {
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },
        run: {
            start: {
                cmd: 'npm',
                args: [
                    'start'
                ]
            },
        },
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default', 'help', function () {
        console.log('grunt test');
        console.log('grunt start');
    });

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('start', ['run:start']);
};