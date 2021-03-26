let HomePage = require('../pages/homePage');
let combinationsData = require("../data/lit-basin-41473/combinationsData");
let Chance = require('chance');


const CUISINES_COMBINATION_RATING_AND_PRICE = Chance().pickone(combinationsData.combinationsPriceAndRating),
    CUISINES_COMBINATION_ALL_FILTERS = Chance().pickone(combinationsData.combinationsAllFilters);


describe('Home Page -> Filter by combined parameters', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
    });

    it('Filter by rating and price', () => {
        logger.info('WHEN User sets the rating');
        HomePage.setRatingFilter(CUISINES_COMBINATION_RATING_AND_PRICE.rating);
        logger.info('AND User sets the price');
        HomePage.setPriceFilter(CUISINES_COMBINATION_RATING_AND_PRICE.price);
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(CUISINES_COMBINATION_RATING_AND_PRICE.totalResults);
    });

    it('Filter by rating, price and cuisines', () => {
        logger.info('WHEN User sets price');
        HomePage.setRatingFilter(CUISINES_COMBINATION_ALL_FILTERS.rating);
        logger.info('AND User sets rating');
        HomePage.setPriceFilter(CUISINES_COMBINATION_ALL_FILTERS.price);
        logger.info(`AND User sets the ${CUISINES_COMBINATION_ALL_FILTERS.typeOfRestaurant} `);
        HomePage.selectCuisine(CUISINES_COMBINATION_ALL_FILTERS.typeOfRestaurant);
        logger.info('THEN The number of results is correct');
        logger.info(CUISINES_COMBINATION_ALL_FILTERS.totalResults);
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(CUISINES_COMBINATION_ALL_FILTERS.totalResults);
    });

    afterEach(() => {
        HomePage.reload()
    });

});
