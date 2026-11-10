const { test, expect } =  require('@playwright/test');

//decalaring the test
test('TC1: register user, then delete user', async ({page})=>{
    const name = 'Tester';
    const email = `tester${Date.now()}@abb.com`;
    const password = 'Test@123';

    // open the application 
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveTitle('Automation Exercise');

    // navigating to signup page
    await page.getByRole('link',{name:' Signup / Login'}).click();
    await expect(page.getByRole('heading',{name:'New User Signup!'})).toBeVisible();

    // fill the SignUp form
    const signupForm = page.locator('.signup-form');
    await signupForm.getByPlaceholder('Name').fill(name);
    await signupForm.getByPlaceholder('Email Address').fill(email);
    await signupForm.getByRole('button', {name: 'Signup'}).click();

    //Fill the Accountant information form 
      await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
    await page.locator('#id_gender1').click();
    await page.locator('#password').fill(password);
    await page.locator('#days').selectOption('10');
    await page.locator('#months').selectOption('5');
    await page.locator('#years').selectOption('1998');
    await page.locator('#newsletter').check();
    await page.locator('#optin').check();
    // Address details
  await page.locator('#first_name').fill('Test');
  await page.locator('#last_name').fill('User');
  await page.locator('#company').fill('Test Company');
  await page.locator('#address1').fill('1 Test Street');
  await page.locator('#country').selectOption('Canada');
  await page.locator('#state').fill('Test State');
  await page.locator('#city').fill('Test City');
  await page.locator('#zipcode').fill('12345');
  await page.locator('#mobile_number').fill('9876543210');

  // Create the account
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();

  // Logged in, then clean up
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});