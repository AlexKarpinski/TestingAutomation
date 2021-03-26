exports.config = {

    allScriptsTimeout: 12000,

    specs: [
        './tests/*.js'
    ],

    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: 2
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
        global.EC = protractor.ExpectedConditions;
        let log4js = require('log4js');
        let Chance = require('chance');
        global.Chance = require('chance').Chance();
        global.logger = require('log4js').getLogger();
        global.logger.level = 'info';
    }

};
