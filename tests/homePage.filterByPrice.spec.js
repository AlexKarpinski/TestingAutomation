let HomePage = require('../pages/homePage');
let priceData = require("../data/priceData");
let Chance = require('chance');

const CUISINES_WITH_PRICE = Object.values(priceData.prices)[Chance().integer({min: 0, max: 4})],
    FILTER_NAME = 'price';

describe('Home Page -> Filter by price', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets prise');
        HomePage.setFilter(FILTER_NAME, CUISINES_WITH_PRICE.price);
    });

    it('Filter by price', function () {
        logger.info('THEN The number of results is correct');
        expect(HomePage.countOfRestaurants).toEqual(CUISINES_WITH_PRICE.numberOfRestaurant);
        logger.info('AND Value of price in the list is correct for all restaurants');
        for (let i = 0; i < HomePage.countOfRestaurants; i++) {
            expect(HomePage.getValueForRestaurantInList(FILTER_NAME, i)).toBe(CUISINES_WITH_PRICE.price);
        }
    });

    it('Clear price filter', function () {
        logger.info(`WHEN User clears ${FILTER_NAME} filter`);
        HomePage.clearFilter(FILTER_NAME)
        logger.info('THEN The number of results is correct');
        expect(HomePage.countOfRestaurants).toEqual(priceData.totalNumberOfRestaurant);
    });

});
