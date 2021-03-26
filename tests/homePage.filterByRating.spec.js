let HomePage = require('../pages/homePage');
let ratingData = require("../data/ratingData");
let Chance = require('chance');


const RATING = Chance().pickone(ratingData.ratings)


describe('Home Page -> Filter by rating', () => {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info(RATING.price);
        logger.info('WHEN User sets rating');
        HomePage.setRatingFilter(RATING.rating);
    });

    it('Filter by rating', () => {
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(RATING.numberOfRestaurantWithRating);
    });

    it('Clear rating filter', () => {
        logger.info(`WHEN User clears rating filter`);
        HomePage.clearRatingFilter();
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(ratingData.totalNumberOfRestaurant);
    });

});
