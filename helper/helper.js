let Chance = require('chance');
let cuisinesData = require("../data/cuisinesData");

class Helper {

    getRandomCuisines(count) {
        let listOfCuisines = [];
        for (let i = 0; i < count; i++) {
            let CUISINE = Object.values(cuisinesData.cuisine)[Chance().integer({min: 0, max: 9})];
            if (!listOfCuisines.includes(CUISINE)) {
                listOfCuisines.push(CUISINE);
            }
        }
        return listOfCuisines
    };

    getCountOfRestaurantsFromCuisines(cuisines) {
        let resultCount = 0;
        cuisines.forEach(cuisine => {
            let countOfCuisines = cuisine.restaurants.length;
            resultCount = resultCount + countOfCuisines;
        });
        return resultCount;
    };

}
module.exports = new Helper();
