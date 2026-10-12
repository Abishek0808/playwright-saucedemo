const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');
const CheckoutInfoPage = require('../pages/checkout-info.page');
const CheckoutOverviewPage = require('../pages/checkout-overview.page');
const CheckoutCompletePage = require('../pages/checkout-complete.page');

let loginPage;
let inventoryPage;
let cartPage;
let checkoutInfoPage;
let checkoutOverviewPage;
let checkoutCompletePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutInfoPage = new CheckoutInfoPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  checkoutCompletePage = new CheckoutCompletePage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
});

test('user can complete checkout', async () => {
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.shoppingCartLink.click();

  await expect(cartPage.cartItemNames).toHaveText('Sauce Labs Backpack');
  await cartPage.goToCheckout();

  await checkoutInfoPage.fillCustomerInfo('Tester', 'User', '600095');
  await checkoutInfoPage.clickContinue();

  await checkoutOverviewPage.finishOrder();

  await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
});