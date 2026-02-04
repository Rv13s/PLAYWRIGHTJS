import{expect, test} from '@playwright/test'

test("More validations", async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto("https://www.google.com")
    // await page.goBack();
    // await page.goForward();
    const field =  page.locator('#displayed-text');
    await expect(field).toBeVisible();
    const hideBtn =  page.locator('#hide-textbox');
    await hideBtn.click();
    await expect(field).toBeHidden();

   //Handle javascript alerts popups
    page.on('dialog',async dialog =>{
        await page.waitForTimeout(2000);
        console.log( dialog.message())
        await dialog.accept()})
    await page.locator('#alertbtn').click();

    //Hover
    await page.hover('#mousehover');
    await page.locator('.mouse-hover .mouse-hover-content a', {hasText: "Reload"}).click();

    const framePage = page.locator('#courses-iframe');
   
    //await framePage.locator("li a[href*='lifetime-access']:visible").highlight();
    // await page.pause();
    await framePage.locator("li a[href*='lifetime-access']:visible").click();




    

})

test.skip("Check", async({page})=>{
    await page.goto("https://legacy.rahulshettyacademy.com/");
    await page.locator("li a[href*='lifetime-access']:visible").click();
    await page.pause();
})