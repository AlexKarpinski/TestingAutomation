let Chance = require('chance');
let Helper = require('../../helper/helper.js');
let HomePage = require('../../pages/homePage');
let data = require('../../data/lit-basin-41473/restaurantsData.json')


const RESTAURANTS_DATA = data.restaurants,
    RANDOM_CUISINE = Chance().pickone(Helper.getCuisinesFromRestaurants(RESTAURANTS_DATA)),
    RANDOM_RATING = Chance().pickone(Helper.getRatingsFromRestaurants(RESTAURANTS_DATA)),
    RANDOM_PRICE = Chance().pickone(Helper.getPricesFromRestaurants(RESTAURANTS_DATA));


describe('Home Page -> Filter by combined parameters', () => {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
    });

    it('Filter by rating and price', () => {
        logger.info('WHEN User sets the rating');
        HomePage.setRatingFilter(RANDOM_RATING);
        logger.info('AND User sets the price');
        HomePage.setPriceFilter(RANDOM_PRICE);
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList())
            .toEqual(Helper.getRestaurantsWithRatingAndPrice(RESTAURANTS_DATA, RANDOM_RATING, RANDOM_PRICE).length);
    });

    it('Filter by rating and cuisine', () => {
        logger.info('WHEN User sets the rating');
        HomePage.setRatingFilter(RANDOM_RATING);
        logger.info('WHEN User sets the cuisine');
        HomePage.selectCuisine(RANDOM_CUISINE);
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList())
            .toEqual(Helper.getRestaurantsWithRatingAndCuisine(RESTAURANTS_DATA, RANDOM_RATING, RANDOM_CUISINE).length);
    });

    it('Filter by price and cuisine', () => {
        logger.info('WHEN User sets the price');
        HomePage.setPriceFilter(RANDOM_PRICE);
        logger.info('WHEN User sets the cuisine');
        HomePage.selectCuisine(RANDOM_CUISINE);
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList())
            .toEqual(Helper.getRestaurantsWithPriceAndCuisine(RESTAURANTS_DATA, RANDOM_PRICE, RANDOM_CUISINE).length);
    });

    it('Filter by rating, price and cuisines', () => {
        logger.info('WHEN User sets price');
        HomePage.setRatingFilter(RANDOM_RATING);
        logger.info('AND User sets rating');
        HomePage.setPriceFilter(RANDOM_PRICE);
        logger.info(`AND User sets the cuisine`);
        HomePage.selectCuisine(RANDOM_CUISINE);
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList())
            .toEqual(Helper
                .getRestaurantsWithRatingAndPriceAndCuisine(
                    RESTAURANTS_DATA, RANDOM_RATING, RANDOM_PRICE, RANDOM_CUISINE).length
            );
    });

    afterEach(() => {
        HomePage.reload()
    });

});
