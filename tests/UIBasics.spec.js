const { test, expect } = require("@playwright/test"); // import{test} from '@playwright/test'
/*
    in this test topics are included locators, actions, radio , check box, dropdowns, assertions
*/

test('Check error message on login page', async ({browser})=>{  // anonymus function
    const context = await browser.newContext(); // start new browser instance ( without having cookies)
    const page =  await context.newPage(); // fresh new inco page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //css - xpath
    await page.locator('#username').fill('rahulshetty/academy');
    await page.locator('#password').fill('Learning@830$3mK2d');
    await page.locator("[type='checkbox']").click();

    await page.locator("input[id='signInBtn']").click();
    // console.log('innerText B   ' +  await page.innerText('.alert.alert-danger.col-md-12'))
    //await expect(page.locator('.alert.alert-danger.col-md-12')).toHaveText('Incorrect username/password.');
    console.log(await page.locator('[style*="block"]').textContent())
    const isErrorMsgDis= await expect(page.locator('[style*="block"]')).toHaveText('Incorrect username/password.')
    console.log(isErrorMsgDis)
    // console.log('textContent' + await page.textContent('.alert.alert-danger.col-md-12'))
    // console.log('innerText' +  await page.innerText('.alert.alert-danger.col-md-12'))


})

test('Check landing page and print all the product title', async({page})=>{
    let name='rahulshettyacademy';
    let pwd = 'Learning@830$3mK2'; //Learning@830$3mK2
    const username = page.locator('#username');
    const password = page.locator('#password');
    const checkbox = page.locator("[type='checkbox']");
    const signInBtn = page.locator("input[id='signInBtn']");
    const homePageTitle = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //css - xpath
    await username.fill(name);
    await password.fill(pwd);
    await checkbox.click();

    await signInBtn.click();
    
   // console.log('First product title: ' + await homePageTitle.first().textContent());
  console.log( await page.waitForLoadState(homePageTitle).allTextContents());
//console.log('All product title: ' + await homePageTitle.allTextContents());


})

test('Radio buttons and dropdowns', async({page})=>{
    const username = page.locator('#username');
    const password = page.locator('#password');
    const radiobtn = page.locator('.customradio');
    const dropdown = page.locator('select.form-control');
    const okBtn = page.locator('#okayBtn');
    const checkbox = page.locator("[type='checkbox']");
    const signInBtn = page.locator("input[id='signInBtn']");
    const documentLink = page.locator("[href*='documents-request']");
    const homePageTitle = page.locator('.card-body a');
    

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await dropdown.selectOption('consult');
    await radiobtn.last().click();
    await okBtn.click();
    //assertion check radio btn is checked or not
    console.log(await radiobtn.first().isChecked());
    await expect(radiobtn.last()).toBeChecked();
    //now check and uncheck the terms btn, and check the assertion
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck(); // if i command this line 
    expect(await checkbox.isChecked()).toBeFalsy(); // it will be fail 

    //handle blinking text class
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    await page.pause()

})

test.only('Child page handling', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage]=await Promise.all([
        context.waitForEvent('page') ,// Listener waiting for a new page open
        await documentLink.click() // new window opened 
    // context.waitForEvent('page') // If i add a lister after clicking new window there is no use, system waiting for a new window open , but it is just opened before this step. 
    ]) // new page is opened

    const text = newPage.locator('.red');
    const paratext = await text.textContent();
    console.log(paratext); // print full line
    // Sperate the domain name
    const arraytext = await paratext.split("@");
    const domainName = await arraytext[1].split(" ")[0];
    const rsDoamin =  await arraytext[1].split(" ")[1];
    console.log(domainName);
    console.log(rsDoamin)
    console.log('Move to parent page')
    await page.pause();
    await username.fill(domainName);

    //await expect.soft(username).toHaveText('domainName');
    console.log(await username.inputValue());
    await page.close();
    console.log( await newPage.title());
    await newPage.close();
    
     
}) 