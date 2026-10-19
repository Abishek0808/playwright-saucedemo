class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = this.cartItems.locator('[data-test="inventory-item-name"]');
    this.cartItemPrices = this.cartItems.locator('[data-test="inventory-item-price"]');
    this.cartItemPrice = this.cartItemPrices;
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  getRemoveButton(productName) {
    const formattedName = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return this.page.locator(`[data-test="remove-${formattedName}"]`);
  }

  async removeFromCart(productName) {
    await this.getRemoveButton(productName).click();
  }
}

module.exports = CartPage;