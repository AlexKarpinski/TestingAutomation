let Chance = require('chance');
let Helper = require('../../helper/helper.js');
let HomePage = require('../../pages/homePage');
let data = require('../../data/lit-basin-41473/restaurantsData.json')


const RESTAURANTS_DATA = data.restaurants,
    RANDOM_RATING = Chance().pickone(Helper.getRatingsFromRestaurants(RESTAURANTS_DATA));


describe('Home Page -> Filter by rating', () => {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets rating');
        HomePage.setRatingFilter(RANDOM_RATING);
    });

    it('Filter by rating', () => {
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList())
            .toEqual(Helper.getRestaurantsWithRating(RESTAURANTS_DATA, RANDOM_RATING).length);
    });

    it('Clear rating filter', () => {
        logger.info('WHEN User clears rating filter');
        HomePage.clearRatingFilter();
        logger.info('THEN The number of results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(RESTAURANTS_DATA.length);
    });

});
