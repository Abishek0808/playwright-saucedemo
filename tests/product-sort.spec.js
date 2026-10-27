const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const ProductSortPage = require('../pages/products-sort.page');

let loginPage;
let inventoryPage;
let productSortPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  productSortPage = new ProductSortPage(page);

  await page.goto('/');
  await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
});

test('user can sort products by price low to high', async () => {
  await productSortPage.sortBy('lohi');

  await expect(inventoryPage.productNames.first()).toHaveText('Sauce Labs Onesie');
  await expect(inventoryPage.productNames.last()).toHaveText('Sauce Labs Fleece Jacket');

});
