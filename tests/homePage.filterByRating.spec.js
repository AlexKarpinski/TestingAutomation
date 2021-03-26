let HomePage = require('../pages/homePage');
let ratingData = require("../data/ratingData");
let Chance = require('chance');

const CUISINES_WITH_RATING = Object.values(ratingData.ratings)[Chance().integer({min: 0, max: 4})];


describe('Home Page -> Filter by rating', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets rating');
        HomePage.setRatingFilter(CUISINES_WITH_RATING.rating);
    });

    it('Filter by rating', function () {
        logger.info('THEN The number of results is correct');
        expect(HomePage.countOfRestaurants).toEqual(CUISINES_WITH_RATING.numberOfRestaurant);
        logger.info('AND Value of rating in the list is correct for all restaurants');
        for (let i = 0; i < HomePage.countOfRestaurants; i++) {
            expect(HomePage.getRatingForRestaurantInList(i)).toBe(CUISINES_WITH_RATING.rating);
        }
    });

    it('Clear rating filter', function () {
        logger.info(`WHEN User clears rating filter`);
        HomePage.clearRatingFilter();
        logger.info('THEN The number of results is correct');
        expect(HomePage.countOfRestaurants).toEqual(ratingData.totalNumberOfRestaurant);
    });

});
