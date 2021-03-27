class Helper {

    getRestaurantsWithCuisine(restaurants, cuisine) {
        return restaurants.filter(restaurant => restaurant.cuisine === cuisine);
    };

    getCuisinesFromRestaurants(restaurants) {
        let cuisines = restaurants.map(restaurants => restaurants.cuisine);
        return cuisines.filter((item, index) => cuisines.indexOf(item) === index);
    }

    getNumberOfRestaurantsWithCuisines(restaurants, cuisines) {
        let initialValue = 0;
        return cuisines.reduce((sum, cuisine) => sum + this.getRestaurantsWithCuisine(restaurants, cuisine).length, initialValue);
    }

    getPricesFromRestaurants(restaurants) {
        let prices = restaurants.map(restaurants => restaurants.price);
        return prices.filter((item, index) => prices.indexOf(item) === index);
    }

    getRestaurantsWithPrice(restaurants, price) {
        return restaurants.filter(restaurant => restaurant.price === price);
    }

    getRatingsFromRestaurants(restaurants) {
        let ratings = restaurants.map(restaurants => restaurants.rating);
        return ratings.filter((item, index) => ratings.indexOf(item) === index);
    }

    getRestaurantsWithRating(restaurants, rating) {
        return restaurants.filter(restaurant => restaurant.rating === rating);
    }

    getRestaurantsWithRatingAndPrice(restaurants, rating, price) {
        let restaurantsWithRating = this.getRestaurantsWithRating(restaurants, rating);
        return this.getRestaurantsWithPrice(restaurantsWithRating, price);
    }

    getRestaurantsWithRatingAndPriceAndCuisine(restaurants, rating, price, cuisine) {
        let restaurantsWithRating = this.getRestaurantsWithRating(restaurants, rating);
        let restaurantsWithRatingAndPrice = this.getRestaurantsWithPrice(restaurantsWithRating, price);
        return this.getRestaurantsWithCuisine(restaurantsWithRatingAndPrice, cuisine);
    }

    getRestaurantsWithRatingAndCuisine(restaurants, rating, cuisine) {
        let restaurantsWithRating = this.getRestaurantsWithRating(restaurants, rating);
        return this.getRestaurantsWithCuisine(restaurantsWithRating, cuisine);
    }

    getRestaurantsWithPriceAndCuisine(restaurants, price, cuisine) {
        let restaurantsWithPrice = this.getRestaurantsWithPrice(restaurants, price);
        return this.getRestaurantsWithCuisine(restaurantsWithPrice, cuisine);
    }

}

module.exports = new Helper();
