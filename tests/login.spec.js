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
const invalidLogins = [
  { username: 'Invalid_user', password: 'secret_sauce', errorexpected:'Epic sadface: Username and password do not match any user in this service' },
  { username: 'standard_user', password: 'Invalid_password',errorexpected:'Epic sadface: Username and password do not match any user in this service'  },
  { username: 'test_user', password: 'Invalid_password', errorexpected:'Epic sadface: Username and password do not match any user in this service'  },
  {username: '', password:'secret_sauce', errorexpected:'Epic sadface: Username is required'},
  {username: 'standard_user', password:'', errorexpected:'Epic sadface: Password is required'}
];

invalidLogins.forEach(({ username, password ,errorexpected}) => {
  test(`Invalid login: ${username} / ${password}`, async () => {
    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toContainText(errorexpected);
  });
});
