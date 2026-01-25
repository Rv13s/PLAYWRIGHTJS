const {test,expect, chromium} = require("@playwright/test");

test.only('Get landing page product Title', async()=>{
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const cards = page.locator('.card-body [style*="text-transform"]'); //.card-body b


    await page.goto('https://rahulshettyacademy.com/client/auth/login')
    await userEmail.fill('testra@gmail.com');
    await password.fill('Test@123');
    await loginBtn.click();

    console.log('All product title before using loadstate: ' + await cards.allTextContents()); // empty records printing
    await page.locator('.card-body b').last().waitFor(); 
    console.log('All product title before using waitfor(): ' + await cards.allTextContents());
    await page.waitForLoadState('networkidle');
    console.log('All product title using networkidle(): ' + await cards.allTextContents());
    //console.log('First Product title textContent: ' + await cards.first().textContent());



})

test('Get landing page All product Title ', async({page})=>{
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const cards = page.locator('.card-body b');


    await page.goto('https://rahulshettyacademy.com/client/auth/login')
    await userEmail.fill('testra@gmail.com');
    await password.fill('Test@123');
    await loginBtn.click();

    await page.locator('.card-body b').first().waitFor();

    //await page.waitForLoadState('networkidle');
    console.log('All product title: ' + await cards.allTextContents());
    
})