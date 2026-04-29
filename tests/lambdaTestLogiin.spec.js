import {test} from '@playwright/test'

test.only('Land home page', async({page})=>{
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.waitForLoadState('networkidle');
    const myAccount =  page.locator('span').filter({ hasText: 'My account' }).last();
    await myAccount.hover();
    await page.locator('span:has-Text("Register")').click();
    await page.waitForLoadState('networkidle');
    // Create a new user
    

    



})

test('Enter valid data', async({page})=>{

    await page.locator('#input-firstname').fill('Gopal')
    await page.locator('#input-lastname').fill('Karun')
    await page.locator('#input-email').fill('gopalKarun@test.com')
    await page.locator('#input-telephone').fill('7010101010')
    await page.locator('#input-password').fill('test@123')
    await page.locator('#input-confirm').fill('test@123')
    await page.locator("label[for='input-agree']").click();
    await page.pause();
    await page.locator("input[value='Continue']").click();
    
     



})

test.only('Check validations messages', async({page})=>{

await page.locator("input[value='Continue']").click();
expect(page.locator(''))
First Name must be between 1 and 32 characters!
Last Name must be between 1 and 32 characters!
E-Mail Address does not appear to be valid!

Telephone must be between 3 and 32 characters!
Password must be between 4 and 20 characters!

Password confirmation does not match password!


})