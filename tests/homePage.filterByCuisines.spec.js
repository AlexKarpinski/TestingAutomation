let HomePage = require('../pages/homePage');
let cuisinesData = require("../data/cuisinesData");
let Chance = require('chance');

const CUISINES_TYPE = Object.values(cuisinesData.cuisine)[Chance().integer({min: 0, max: 11})],
    COUNT_OF_CUISINES = [Chance().integer({min: 2, max: 9})],
    LIST_OF_CUISINES = HomePage.getRandomListOfCuisines(COUNT_OF_CUISINES);

describe('Home Page -> Filter by cuisines', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
    });

    it('Filter by one cuisine', function () {
        logger.info(`WHEN User sets the ${CUISINES_TYPE.typeOfRestaurant} `);
        HomePage.setCuisine(CUISINES_TYPE.typeOfRestaurant);
        logger.info(`THEN ${CUISINES_TYPE.typeOfRestaurant} checkbox should be checked `);
        expect(HomePage.getCuisineCheckbox(CUISINES_TYPE.typeOfRestaurant).isSelected()).toBe(true);
        logger.info('AND The number of restaurants in the list should be as count of restaurant from label');
        expect(HomePage.countOfRestaurants).toEqual(HomePage.countOfRestaurantsFromLabel);
        logger.info('AND The number of results is correct');
        expect(HomePage.countOfRestaurants).toEqual(CUISINES_TYPE.restaurants.length);
    });

    it('Filter by list of cuisines', function () {
        logger.info('WHEN User sets the list of cuisines');
        HomePage.setRandomListOfCuisines(LIST_OF_CUISINES);
        logger.info('THEN The count of restaurants in the list should be as count of restaurant from label');
        expect(HomePage.countOfRestaurants).toEqual(HomePage.countOfRestaurantsFromLabel);
        logger.info('AND The count of found results is correct');
        expect(HomePage.countOfRestaurants).toEqual(HomePage.getCountOfRestaurantsFromRandomList(LIST_OF_CUISINES));
    });

    it('Clear cuisines filter', function () {
        logger.info('WHEN User sets the list of cuisines');
        HomePage.setRandomListOfCuisines(LIST_OF_CUISINES);
        logger.info('AND User clears cuisines filter');
        HomePage.setRandomListOfCuisines(LIST_OF_CUISINES);
        logger.info('THEN The count of found results is correct');
        expect(HomePage.countOfRestaurants).toEqual(cuisinesData.numberOfRestaurant);
    });

    afterEach(function () {
        HomePage.reload()
    });

});
