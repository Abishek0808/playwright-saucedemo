const InventoryPage = require('../pages/inventory.page');
const LoginPage = require('../pages/login.page');
const CartPage = require('../pages/cart.page');
const { test, expect } = require('@playwright/test');

let inventoryPage;
let loginPage;
let cartPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  await page.goto('/');
  await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
});test('cart shows the added product', async () => {
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.shoppingCartLink.click();
  await expect(cartPage.cartItemNames).toHaveText('Sauce Labs Backpack');
  await expect(cartPage.cartItemPrices).toHaveText('$29.99');
});