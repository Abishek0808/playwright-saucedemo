class ProductSortPage {
    constructor(page) {
        this.page = page;
        this.sortContainer = page.locator('[data-test="product-sort-container"]');
    }

    async sortBy(optionValue) {
        await this.sortContainer.selectOption(optionValue);
    }
}

module.exports = ProductSortPage;