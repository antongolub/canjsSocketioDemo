/*globals module*/


// Karma configuration
// Generated on Sun Oct 20 2013 07:28:56 GMT+0200 (CEST)

module.exports = function (config) {
    "use strict";
    config.set({

        plugins: [
            'karma-requirejs',
            'karma-qunit',
            'karma-coverage',
            'karma-chrome-launcher'
        ],


        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['qunit', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            //application files
            {pattern: 'src/js/**/*.js', included: false},
            {pattern: 'src/js/**/**/*.js', included: false},
            {pattern: 'src/js/app/templates/*.hbs', included: false},
            {pattern: 'src/js/app/templates/**/*.hbs', included: false},

            {pattern: 'tests/helpers/*.*', included: false},

            //tests itself
            {pattern: 'tests/**/*Test.js', included: false},

            'tests/main.js'
        ],


        // list of files to exclude
        exclude: [
            'src/js/app/main.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],

        preprocessors: {
            'src/js/app/**/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        //coverageReporter: {
        //    type: 'html',
        //    dir: 'coverage/'
        //},
        coverageReporter: {
            //type: 'text-summary'
            type: 'html',
            dir: 'coverage/'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true

        //,

        //preprocessors: {
        //    'src/js/**/*.js': 'coverage'
        //}

    });
};
