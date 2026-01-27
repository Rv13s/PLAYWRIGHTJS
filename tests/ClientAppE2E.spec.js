const {test, expect}= require('@playwright/test');
const { type } = require('node:os');

test.only('Add to cart test', async({page})=>{
    const emailIDField = page.locator('#userEmail');
    const passwordField = page.locator('input[type="password"]');
    const loginBtn = page.locator('#login');
    const allProducts = page.locator('.card-body');
    const prod ='ADIDAS ORIGINAL';
    await page.goto('https://rahulshettyacademy.com/client/');
    await emailIDField.fill('testra@gmail.com');
    await passwordField.fill("Test@123");
    await loginBtn.click();
    //Assertion
    const pageUrlAssert = await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    const crntUrl = page.url();
    console.log('pageUrlAssert : '+pageUrlAssert); 
    console.log('Current Url : '+crntUrl);
    //const allProductTitle = await page.locator(".card-body b").first().allTextContents();
    //console.log('All product title: '+allProductTitle);
    const allProductCount = await allProducts.count();
    console.log(allProductCount)
    //await page.pause();

    for(let i = 0 ; i <allProductCount ; i++){
        if (await allProducts.nth(i).locator('b').textContent() ===  prod ){
            await allProducts.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

   // await page.pause();

    //Check the cart 
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const isprd = await page.locator(`h3:has-text('${prod}')`).isVisible();
    console.log("Is cart prd visible: " + isprd)
    console.log(expect(isprd).toBeTruthy());
    await page.pause();
})