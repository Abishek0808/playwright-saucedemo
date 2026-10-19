class InventoryPage {
    constructor(page) {
        this.page = page;
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
    }

    getAddToCartButton(productName) {
        const formattedName = productName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        return this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    }

    async addToCart(productName) {
        await this.getAddToCartButton(productName).click();
    }

    async sortBy(optionValue) {
        await this.sortDropdown.selectOption(optionValue);
    }
}

module.exports = InventoryPage;