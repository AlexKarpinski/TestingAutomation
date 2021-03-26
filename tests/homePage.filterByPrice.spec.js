let HomePage = require('../pages/homePage');
let priceData = require("../data/priceData.js");
let Chance = require('chance');


const PRICE = Chance().pickone(priceData.prices);


describe('Home Page -> Filter by price', () => {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets prise');
        HomePage.setPriceFilter(PRICE.price);
    });

    it('Filter by price', () => {
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(PRICE.numberOfRestaurantWithPrice);
    });

    it('Clear price filter', () => {
        logger.info(`WHEN User clears price filter`);
        HomePage.clearPriceFilter();
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(priceData.totalNumberOfRestaurant);
    });

});
