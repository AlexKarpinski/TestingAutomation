let Chance = require('chance');
let Helper = require('../../helper/helper.js');
let HomePage = require('../../pages/homePage');
let data = require('../../data/lit-basin-41473/restaurantsData.json');


const RESTAURANTS_DATA = data.restaurants,
    RANDOM_PRICE = Chance().pickone(Helper.getPricesFromRestaurants(RESTAURANTS_DATA));


describe('Home Page -> Filter by price', () => {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets prise');
        HomePage.setPriceFilter(RANDOM_PRICE);
    });

    it('Filter by price', () => {
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList())
            .toEqual(Helper.getRestaurantsWithPrice(RESTAURANTS_DATA, RANDOM_PRICE).length);
    });

    it('Clear price filter', () => {
        logger.info('WHEN User clears price filter');
        HomePage.clearPriceFilter();
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(RESTAURANTS_DATA.length);
    });

});
