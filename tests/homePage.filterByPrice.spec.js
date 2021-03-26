let HomePage = require('../pages/homePage');
let priceData = require("../data/priceData");
let Chance = require('chance');


const PRICE = Chance().pickone(priceData.prices);


describe('Home Page -> Filter by price', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets prise');
        HomePage.setPriceFilter(PRICE.price);
    });

    it('Filter by price', function () {
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(PRICE.numberOfRestaurantWithPrice);
        logger.info('AND Value of price in the list is correct for all restaurants');
        for (let i = 0; i < HomePage.getCountOfRestaurantsFromResultsList(); i++) {
            expect(HomePage.getPriceForRestaurantInList(i)).toBe(PRICE.price);
        }
    });

    it('Clear price filter', function () {
        logger.info(`WHEN User clears price filter`);
        HomePage.clearPriceFilter();
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(priceData.totalNumberOfRestaurant);
    });

});
