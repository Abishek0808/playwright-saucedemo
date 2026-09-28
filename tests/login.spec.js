const LoginPage = require('../pages/login.page.js');
const {test, expect} = require('@playwright/test');
test(' Valid user can log in', async ({page}) => {
    const loginPage= new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});
test('Invalid username show error', async ({page}) =>{
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('Invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service')
})