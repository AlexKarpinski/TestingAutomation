class HomePage {

    open() {
        browser.waitForAngularEnabled(false);
        browser.get(browser.baseUrl);
        this.waitForPageLoading();
    };

    reload() {
        browser.refresh();
        this.waitForPageLoading();
    };

    get listOfRestaurantsLabel() {
        return element(by.xpath("//div[contains(@class,'fm-restaurant-list')]//ng-pluralize"));
    };

    get cuisineList() {
        return element(by.model('filter.cuisine'));
    };

    get clearRatingButton() {
        return element(by.xpath("//fm-rating[1]/a"));
    };

    get clearPriceButton() {
        return element(by.xpath("//fm-rating[2]/a"));
    };

    getCountOfRestaurantsFromResultsList() {
        return element.all(by.xpath("//tr[@ng-repeat='restaurant in restaurants']")).count()
    };

    getRatingFilter(value) {
        return element(by.xpath(`//*[@ng-model="$parent.filter.rating"]//li[${value}]`));
    };

    getPriceFilter(value) {
        return element(by.xpath(`//*[@ng-model="$parent.filter.price"]//li[${value}]`));
    };

    getCuisineCheckbox(typeOfCuisines) {
        return this.cuisineList.element(by.css(`input[value="${typeOfCuisines}"]`));
    };

    waitForPageLoading() {
        browser.wait(EC.textToBePresentInElement(this.listOfRestaurantsLabel, 'restaurants found!'));
    };

    async selectCuisine(cuisine) {
        await this.getCuisineCheckbox(cuisine).click();
    };

    getCountOfRestaurantsFromLabel() {
        return this.listOfRestaurantsLabel.getText().then(text => {
            let elements = text.split(' ');
            return +elements[0]
        })
    };

    setRatingFilter(value) {
        this.getRatingFilter(value).click();
    };

    async setPriceFilter(value) {
        await this.getPriceFilter(value).click();
    };

    moveMouseToRatingFilter() {
        browser.actions().mouseMove(this.clearRatingButton).perform();
    };

    moveMouseToPriceFilter() {
        browser.actions().mouseMove(this.clearPriceButton).perform();
    };

    clearRatingFilter() {
        browser.wait(EC.visibilityOf(this.clearRatingButton));
        this.moveMouseToRatingFilter();
        this.clearRatingButton.click()
    };

    clearPriceFilter() {
        browser.wait(EC.visibilityOf(this.clearPriceButton));
        this.moveMouseToPriceFilter();
        this.clearPriceButton.click()
    };

    selectCuisines(cuisines) {
        cuisines.forEach(cuisine => {
            this.selectCuisine(cuisine.typeOfRestaurant);
        })
    };

}

module.exports = new HomePage();
