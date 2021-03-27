let Chance = require('chance');
let Helper = require('../helper/helper.js');
let HomePage = require('../pages/homePage');
let data = require('../data/lit-basin-41473/restaurantsData.json');


const RESTAURANTS_DATA = data.restaurants,
    CUISINES = Helper.getCuisinesFromRestaurants(RESTAURANTS_DATA),
    NUMBER_OF_CUISINES = [Chance().integer({min: 2, max: CUISINES.length})],
    RANDOM_CUISINES = Chance().pickset(CUISINES, NUMBER_OF_CUISINES);


describe('Home Page -> Filter by cuisines', function () {

    beforeEach(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
        logger.info('WHEN User sets the list of cuisines');
        HomePage.selectCuisines(RANDOM_CUISINES);
    });

    it('Filter by list of cuisines', () => {
        logger.info('THEN The count of restaurants in the list should be as count of restaurant from label');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(HomePage.getCountOfRestaurantsFromLabel());
        logger.info('AND The count of found results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList())
            .toEqual(Helper.getNumberOfRestaurantsWithCuisines(RESTAURANTS_DATA, RANDOM_CUISINES));
    });

    it('Clear cuisines filter', () => {
        logger.info('WHEN User clears cuisines filter');
        HomePage.selectCuisines(RANDOM_CUISINES);
        logger.info('THEN The count of found results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(RESTAURANTS_DATA.length);
    });

});
