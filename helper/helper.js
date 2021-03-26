class Helper {

    getCountOfRestaurantsFromCuisines(cuisines) {
        let initialValue = 0;
        return cuisines.reduce((sum, cuisine) => sum + cuisine.restaurants.length, initialValue);
    };

}

module.exports = new Helper();
