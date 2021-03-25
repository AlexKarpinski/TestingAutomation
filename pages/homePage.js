let ratingData = require("../data/ratingData.js");
let cuisinesData = require("../data/cuisinesData");
let Chance = require('chance');

class HomePage {

    open() {
        browser.waitForAngularEnabled(false);
        browser.get(browser.baseUrl);
        this.waitForRestaurantLoading(cuisinesData.numberOfRestaurant);
    };

    reload() {
        browser.refresh();
        this.waitForRestaurantLoading(cuisinesData.numberOfRestaurant)
    };

    get listOfRestaurantsLabel() {
        return element(by.xpath("//div[contains(@class,'fm-restaurant-list')]//ng-pluralize"));
    };

    get cuisineList() {
        return element(by.model('filter.cuisine'));
    };

    get countOfRestaurants() {
        return element.all(by.xpath("//tr[@ng-repeat='restaurant in restaurants']")).count()
    };

    getFilter(name, value) {
        return element(by.xpath(`//*[@ng-model="$parent.filter.${name}"]//li[${value}]`));
    };

    getCuisineCheckbox(typeOfCuisines) {
        return this.cuisineList.element(by.css(`input[value="${typeOfCuisines}"]`));
    };

    // getNamesOfRestaurantsInTheList() {
    //     let names = [];
    //     element.all(by.xpath("//tr[@ng-repeat='restaurant in restaurants']")).then(elements=>{
    //         logger.info(`${elements}`);
    //         elements.forEach(el=> {
    //             logger.info(`${el.element(by.css('b[class="ng-binding"]')).getText().toString()}`);
    //             names.push(el.element(by.css('b[class="ng-binding"]')).getText().toString());
    //         })
    //     })
    //     return names;
    // }

    getClearButton(name) {
        let clearButton;
        switch (name) {
            case 'rating':
                clearButton = element(by.xpath("//fm-rating[1]/a"));
                break;
            case 'price':
                clearButton = element(by.xpath("//fm-rating[2]/a"));
                break;
        }
        return clearButton;
    };

    waitForRestaurantLoading(numberOfRestaurant) {
        browser.wait(EC.textToBePresentInElement(this.listOfRestaurantsLabel, `${numberOfRestaurant} restaurants found`))
    };

    async setCuisine(typeOfCuisines) {
        await this.getCuisineCheckbox(typeOfCuisines).click();
    };

    async setRandomListOfCuisines(listOfCuisines) {
        listOfCuisines.forEach(cuisine => {
            this.setCuisine(cuisine.typeOfRestaurant);
        })
    };

    getRandomListOfCuisines(count) {
        let listOfCuisines = [];
        for (let i = 0; i < count; i++) {
            let CUISINE = Object.values(cuisinesData.cuisine)[Chance().integer({min: 0, max: 9})];
            if (!listOfCuisines.includes(CUISINE)) {
                listOfCuisines.push(CUISINE);
            }
        }
        return listOfCuisines
    };

    getCountOfRestaurantsFromRandomList(listOfCuisines) {
        let resultCount = 0;
        listOfCuisines.forEach(cuisine => {
            let countOfCuisines = cuisine.restaurants.length;
            resultCount = resultCount + countOfCuisines;
        });
        return resultCount;
    };

    get countOfRestaurantsFromLabel() {
        return this.listOfRestaurantsLabel.getText().then(text => {
            let elements = text.split(' ');
            return +elements[0]
        })
    };

    async setFilter(name, value) {
        await this.getFilter(name, value).click();
    };

    moveMouseToFilter(name) {
        browser.actions().mouseMove(this.getClearButton(name)).perform()
    };

    clearFilter(name) {
        browser.wait(EC.visibilityOf(this.getClearButton(name)), 10000, "Clear link for Price filter is not visible");
        this.moveMouseToFilter(name);
        this.getClearButton(name).click()
    };

    getRatingElement(name, index) {
        return element.all(by.xpath(`//table//tr[${index + 2}]` +
            `//fm-rating[@ng-model="$parent.restaurant.${name}"]//*[contains(@class,"fm-selected")]`))
    };

    async getValueForRestaurantInList(name, index) {
        return (await this.getRatingElement(name, index)).count()
    };

}

module.exports = new HomePage();
