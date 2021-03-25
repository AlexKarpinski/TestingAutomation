let cuisinesData = require("../data/cuisinesData");

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

    async selectCuisine(cuisine) {
        await this.getCuisineCheckbox(cuisine).click();
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

    async selectCuisines(cuisines) {
        cuisines.forEach(cuisine => {
            this.selectCuisine(cuisine.typeOfRestaurant);
        })
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

}

module.exports = new HomePage();
