const LoginPage = require('../pages/login.page.js');
const {test, expect} = require('@playwright/test');
let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');
});

test('Valid user can log in', async ({page}) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
test('Invalid username show error', async ({page}) =>{
    await loginPage.login('Invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
})
test('Invalid password show error', async ({page}) =>{
    await loginPage.login('standard_user','Invalid_password');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
} )
test('Invalid password & Invalid username show error', async ({page}) =>{
    await loginPage.login('test_user','Invalid_password');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
} )
