let Helper = require('../helper/helper.js');
let HomePage = require('../pages/homePage');
let data = require('../data/lit-basin-41473/data.json');


const RESTAURANTS_DATA = data.restaurants,
    CUISINES = Helper.getCuisinesFromRestaurants(RESTAURANTS_DATA);


describe('Home Page -> Filter by cuisines', function () {

    beforeAll(() => {
        logger.info('GIVEN User at Home Page');
        HomePage.open();
    });

    CUISINES.forEach(cuisine => {
        it('Filter for each cuisine', () => {
            logger.info(`WHEN User sets the ${cuisine}`);
            HomePage.selectCuisine(cuisine);
            logger.info(`THEN ${cuisine} checkbox should be checked `);
            expect(HomePage.getCuisineCheckbox(cuisine).isSelected()).toBe(true);
            logger.info('AND The number of restaurants in the list should be as count of restaurant from label');
            expect(HomePage.getCountOfRestaurantsFromResultsList()).toEqual(HomePage.getCountOfRestaurantsFromLabel());
            logger.info('AND The number of results is correct');
            expect(HomePage.getCountOfRestaurantsFromResultsList())
                .toEqual(Helper.getRestaurantsWithCuisine(RESTAURANTS_DATA, cuisine).length);
        })
    });

    afterEach(function () {
        HomePage.reload()
    });

});
