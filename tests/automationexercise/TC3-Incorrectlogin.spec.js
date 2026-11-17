const {test,expect}= require('@playwright/test');
test('Login With Incorrect cerdentails', async({page})=>{
    //opeing the application and ensure it's opened
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveTitle('Automation Exercise');
    //Navigate to the login page
    await page.getByRole('link',{name:'Signup / login'}).click();
    await expect(page.getByRole('heading',{name: 'Login to your account'})).toBeVisible();
    //enter the Invalida Cerdent
    await page.locator('[data-qa="login-email"]').fill('invalidUser@gmai.com');
    await page.locator('[data-qa="login-password"]').fill('tester113');
    await page.locator('[data-qa="login-button"]').click();
    //Verify the Error message is visible
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();


})