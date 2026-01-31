import{expect, test} from '@playwright/test'
test.only('Playwright special locators', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    // label is not suitable for text fields, best for clicks checkbox ....
    await page.locator("form input[name='name']").fill('gopal')
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByPlaceholder('Password').fill('Gopal@132');
    // await page.getByLabel("name").fill("puppa");
    // await page.getByRole("button",{name:'Submit'}).click();
    const submissionMessage = page.getByText('Success! The Form has been submitted successfully!.');
    // await expect(submissionMessage).toBeVisible();
    await page.getByRole("link", {name: 'Shop'}).click();
    await page.locator('app-card').filter({hasText:"Nokia Edge"}).getByRole("button").click();

    await page.pause();
})