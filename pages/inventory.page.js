class InventoryPage{
    constructor (page){
        this.page = page;
        this.shoppingCartLink = page.locator('[data-test ="shopping-cart-link"]');
        this.shoppingCartBadge = page.locator('[data-test ="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
    }
    async addToCart(productName) {
        const lowerName = productName.toLowerCase();
        const formattedName = lowerName.replace(/ /g,'-');
        const selector = `[data-test="add-to-cart-${formattedName}"]`;
        await this.page.locator(selector).click();
}
}
module.exports = InventoryPage;