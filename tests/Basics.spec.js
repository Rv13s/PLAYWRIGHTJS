const { test, expect } = require("@playwright/test"); // import{test} from '@playwright/test'

test('Explain',function(){ // async()=>{}  
    // JS is asynchronous it run all the steps simultaneously so we use await
    // await is only working, when you declare async before the functions

})

// Fixtures is simply a global variable
test('Browser context', async ({browser})=>{  // anonymus function
    const context = await browser.newContext(); // start new browser instance ( without having cookies)
    const page =  await context.newPage(); // fresh new inco page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //await expect(page).toHaveTitle();


})

test('{page} fixture test', async({page})=>{
    await page.goto('https://automationexercise.com/');
    //1. get title , 2. assertions
    console.log(await page.title());
    await expect(page).toHaveTitle('Automation Exercise');
 


})

test('Assertion', async({page})=>{
    await page.goto('https://google.com/');
    //1. get title , 2. assertions
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
})