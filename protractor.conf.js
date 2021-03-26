exports.config = {

    allScriptsTimeout: 12000,

    specs: [
        './tests/*.js'
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
        filterByCuisines: ['tests/homePage.filterByCuisines.spec.js'],
        filterByRating: ['tests/homePage.filterByRating.spec.js'],
        filterByPrice: ['tests/homePage.filterByPrice.spec.js'],
        filterByCombinedParameters: ['tests/homePage.filterByCombinedParameters.spec.js'],
        allSuites: ['tests/*.js']
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
