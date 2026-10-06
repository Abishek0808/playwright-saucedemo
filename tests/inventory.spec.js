const InventoryPage = require('../pages/inventory.page');
const LoginPage = require('../pages/login.page');
const { test, expect } = require('@playwright/test');

let inventoryPage;
let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
});

test('add item to cart', async ({ page }) => {
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
});