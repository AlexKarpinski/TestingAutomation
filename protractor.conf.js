exports.config = {

    allScriptsTimeout: 12000,

    specs: [
        './tests/**/*.js'
    ],

    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: 4
    },

    baseUrl: 'https://lit-basin-41473.herokuapp.com/#/',

    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    suites: {
        filterByEachCuisines: ['tests/smoke/homePage.filterByEachCuisine.spec.js'],
        filterByRating: ['tests/smoke/homePage.filterByRating.spec.js'],
        filterByPrice: ['tests/smoke/homePage.filterByPrice.spec.js'],
        filterByCuisines: ['tests/regression/homePage.filterByCuisines.spec.js'],
        filterByCombinedParameters: ['tests/regression/homePage.filterByCombinedParameters.spec.js'],
        smoke:['tests/smoke/*.js'],
        regression:['tests/regression/*.js'],
        allSuites: ['tests/**/*.js']
    },
    onPrepare: function () {
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
        global.EC = protractor.ExpectedConditions;
        let log4js = require('log4js');
        global.logger = require('log4js').getLogger();
        global.logger.level = 'info';
    }

};
