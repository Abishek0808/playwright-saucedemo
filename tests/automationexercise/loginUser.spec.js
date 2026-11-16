const { test, expect } = require('@playwright/test');

const name = 'Tester';
const password = 'Test@123';
let email;

test.beforeEach(async ({ request }) => {
  email = `tester${Date.now()}@abb.com`;

  const response = await request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: name,
      email: email,
      password: password,
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1998',
      firstname: 'Test',
      lastname: 'User',
      company: 'Test Company',
      address1: '1 Test Street',
      address2: '',
      country: 'Canada',
      zipcode: '12345',
      state: 'Test State',
      city: 'Test City',
      mobile_number: '9876543210',
    },
  });

  const body = await response.json();
  expect(body.message).toBe('User created!');
});

test.afterEach(async ({ request }) => {
  await request.delete('https://automationexercise.com/api/deleteAccount', {
    form: { email: email, password: password },
  });
});

test('TC2: login with correct email and password', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveTitle('Automation Exercise');

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

  await page.locator('[data-qa="login-email"]').fill(email);
  await page.locator('[data-qa="login-password"]').fill(password);
  await page.locator('[data-qa="login-button"]').click();

  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
});