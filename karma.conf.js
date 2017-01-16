const WEBPACK_CONFIG = require('./config/webpack.test.js');

var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';

module.exports = function (config) {
    var testConfig = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath : '',

        // frameworks to use
        // available frameworks : https ://npmjs.org/browse/keyword/karma-adapter
        frameworks : ['jasmine'],

        // list of files / patterns to load in the browser
        files  : [
            { pattern : './spec-bundle.js', watched : false }
        ],

        // list of files to exclude
        exclude : [],

        // preprocess matching files before serving them to the browser
        // available preprocessors : https ://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors : {
            './spec-bundle.js' : [
                'webpack',
                'sourcemap'
            ]
        },

        webpack : WEBPACK_CONFIG,

        webpackMiddleware : {
            stats : 'errors-only'
        },

        webpackServer : {
            noInfo : true // please don't spam the console when running in karma!
        },

        // test results reporter to use
        // available reporters : https ://npmjs.org/browse/keyword/karma-reporter
        reporters : ['mocha'],

        // web server port
        port : 9876,

        // enable / disable colors in the output (reporters and logs)
        colors : true,

        // level of logging
        // possible values : config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel : config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch : false,

        // start these browsers
        // available browser launchers : https ://npmjs.org/browse/keyword/karma-launcher
        browsers : ['PhantomJS'], // you can also use Chrome

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun : true
    };

    if (!isTestWatch) {
        // configure coverage reporters
        testConfig.reporters.push('coverage');

        testConfig.coverageReporter = {
            dir             : 'coverage/',
            reporters       : [{
                type    : 'json',
                dir     : 'coverage',
                subdir  : 'json',
                file    : 'coverage.json'
            }]
        };

        testConfig.reporters.push('html');

        // karma-html-reporter plugin config
        testConfig.htmlReporter = {
            outputDir       : 'coverage/unit-tests',    // where to put the reports
            templatePath    : null,                     // set if you moved jasmine_template.html
            focusOnFailures : true,                     // reports show failures on start
            namedFiles      : false,                    // name files instead of creating sub-directories
            pageTitle       : null,                     // page title for reports; browser info by default
            urlFriendlyName : false,                    // simply replaces spaces with _ for files/dirs
            reportName      : 'report-summary'          // report summary filename; browser info by default
        };
    }

    config.set(testConfig);
};
