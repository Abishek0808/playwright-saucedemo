class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.cartItemPrice = this.cartItemPrices;
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async removeFromCart(productName) {
    const lowerName = productName.toLowerCase();
    const formattedName = lowerName.replace(/ /g, '-');
    const selector = `[data-test="remove-${formattedName}"]`;
    await this.page.locator(selector).click();
  }
}

module.exports = CartPage;