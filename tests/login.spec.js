const LoginPage = require('../pages/login.page.js');
const {test, expect} = require('@playwright/test');
let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto('/');
});

test('Valid user can log in', async ({page}) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
    await expect(page).toHaveURL(new URL('/inventory.html', process.env.BASE_URL).toString());
});
const invalidLogins = [
  {
    name: 'unknown username',
    username: 'Invalid_user',
    password: process.env.PASSWORD,
    errorexpected: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'incorrect password',
    username: process.env.STANDARD_USER,
    password: 'Invalid_password',
    errorexpected: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'unknown username and password',
    username: 'test_user',
    password: 'Invalid_password',
    errorexpected: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'empty username',
    username: '',
    password: process.env.PASSWORD,
    errorexpected: 'Epic sadface: Username is required',
  },
  {
    name: 'empty password',
    username: process.env.STANDARD_USER,
    password: '',
    errorexpected: 'Epic sadface: Password is required',
  },
];

invalidLogins.forEach(({ name, username, password, errorexpected }) => {
  test(`Invalid login: ${name}`, async () => {
    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toContainText(errorexpected);
  });
});
