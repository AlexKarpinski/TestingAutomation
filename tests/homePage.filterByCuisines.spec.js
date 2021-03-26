let HomePage = require('../pages/homePage');
let Helper = require('../helper/helper.js');
let cuisinesData = require("../data/cuisinesData");
let Chance = require('chance');


const CUISINE = Chance().pickone(cuisinesData.cuisine),
    NUMBER_OF_CUISINES = [Chance().integer({min: 2, max: 11})],
    CUISINES = Chance().pickset(cuisinesData.cuisine, NUMBER_OF_CUISINES);


describe('Home Page -> Filter by cuisines', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
    });

    it('Filter by one cuisine', function () {
        logger.info(`WHEN User sets the ${CUISINE.typeOfRestaurant} `);
        HomePage.selectCuisine(CUISINE.typeOfRestaurant);
        logger.info(`THEN ${CUISINE.typeOfRestaurant} checkbox should be checked `);
        expect(HomePage.getCuisineCheckbox(CUISINE.typeOfRestaurant).isSelected()).toBe(true);
        logger.info('AND The number of restaurants in the list should be as count of restaurant from label');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(HomePage.getCountOfRestaurantsFromLabel());
        logger.info('AND The number of results is correct');
        logger.info(`${CUISINE.restaurants}`);
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(CUISINE.restaurants.length);
    });

    it('Filter by list of cuisines', function () {
        logger.info('WHEN User sets the list of cuisines');
        HomePage.selectCuisines(CUISINES);
        logger.info('THEN The count of restaurants in the list should be as count of restaurant from label');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(HomePage.getCountOfRestaurantsFromLabel());
        logger.info('AND The count of found results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(Helper.getCountOfRestaurantsFromCuisines(CUISINES));
    });

    it('Clear cuisines filter', function () {
        logger.info('WHEN User sets the list of cuisines');
        HomePage.selectCuisines(CUISINES);
        logger.info('THEN The count of found results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(Helper.getCountOfRestaurantsFromCuisines(CUISINES));
        logger.info('WHEN User clears cuisines filter');
        HomePage.selectCuisines(CUISINES);
        logger.info('THEN The count of found results is correct');
        expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(cuisinesData.numberOfRestaurant);
    });

    afterEach(function () {
        HomePage.reload()
    });

});
