const { test, expect } = require('@playwright/test');

test('TC4: logout user', async ({ page, request }) => {
  const name = 'Tester';
  const password = 'Test@123';
  const email = `tester${Date.now()}@abb.com`;

  // 1. create the user through the API
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

  // 2. log in through the UI
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('[data-qa="login-email"]').fill(email);
  await page.locator('[data-qa="login-password"]').fill(password);
  await page.locator('[data-qa="login-button"]').click();
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();

  // 3. YOUR PART: click Logout, then verify you are back on the login page
  await page.getByRole('link',{name:'Logout'}).click();
  await expect(page.getByRole('heading',{name:'Login to your account'})).toBeVisible();
  // 4. clean up: delete the user through the API
  await request.delete('https://automationexercise.com/api/deleteAccount', {
    form: { email: email, password: password },
  });
});