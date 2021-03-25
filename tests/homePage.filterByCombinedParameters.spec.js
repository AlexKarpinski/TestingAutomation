let HomePage = require('../pages/homePage');
let combinationsData = require("../data/combinationsData");
let Chance = require('chance');

const RATING_AND_PRICE_FILTER = Object.values(combinationsData.combinationsPriceAndRating)[Chance().integer({
        min: 0,
        max: 3
    })],
    COMBINATIONS_ALL_FILTERS = Object.values(combinationsData.combinationsAllFilters)[Chance().integer({
        min: 0,
        max: 2
    })],
    FILTER_PRICE_NAME = 'price',
    FILTER_RATING_NAME = 'rating';

describe('Home Page -> Filter by combined parameters', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
    });

    it('Filter by rating and price', function () {
        logger.info('WHEN User sets price');
        HomePage.setFilter(FILTER_PRICE_NAME, RATING_AND_PRICE_FILTER.price);
        logger.info('AND User sets rating');
        HomePage.setFilter(FILTER_RATING_NAME, RATING_AND_PRICE_FILTER.rating);
        logger.info('THEN The number of results is correct');
        expect(HomePage.countOfRestaurants).toEqual(RATING_AND_PRICE_FILTER.totalResults);
    });

    it('Filter by rating, price and cuisines', function () {
        logger.info('WHEN User sets price');
        HomePage.setFilter(FILTER_PRICE_NAME, COMBINATIONS_ALL_FILTERS.price);
        logger.info('AND User sets rating');
        HomePage.setFilter(FILTER_RATING_NAME, COMBINATIONS_ALL_FILTERS.rating);
        logger.info(`AND User sets the ${COMBINATIONS_ALL_FILTERS.typeOfRestaurant} `);
        HomePage.setCuisine(COMBINATIONS_ALL_FILTERS.typeOfRestaurant);
        logger.info('THEN The number of results is correct');
        expect(HomePage.countOfRestaurants).toEqual(COMBINATIONS_ALL_FILTERS.totalResults);
    });

    afterEach(function () {
        HomePage.reload()
    });

});
