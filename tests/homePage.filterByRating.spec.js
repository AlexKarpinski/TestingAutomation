let HomePage = require('../pages/homePage');
let ratingData = require("../data/ratingData");
let Chance = require('chance');


const RATING = Object.values(ratingData.ratings)[Chance().integer({min: 0, max: 4})];


describe('Home Page -> Filter by rating', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets rating');
        HomePage.setRatingFilter(RATING.rating);
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(RATING.numberOfRestaurantWithRating);
    });

    it('Filter by rating', function () {
        logger.info('AND Value of rating in the list is correct for all restaurants');
        for (let i = 0; i < HomePage.getCountOfRestaurantsFromResultsList(); i++) {
            expect(HomePage.getRatingForRestaurantInList(i)).toBe(RATING.rating);
        }
    });

    it('Clear rating filter', function () {
        logger.info(`WHEN User clears rating filter`);
        HomePage.clearRatingFilter();
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(ratingData.totalNumberOfRestaurant);
    });

});
