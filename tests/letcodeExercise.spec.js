import{expect, test } from '@playwright/test'

test('@Handle Inputs', async({page})=>{
    await page.goto('https://letcode.in/test');
    //Clik Input section edit button
    await page.locator("[href*='edit']").click();
    await page.locator('#fullName').fill('Gopal Muchu');
    await page.locator('#join').fill('Gopal');
    console.log (await page.locator('#getMe').textContent());
    //Clear the text
    await page.locator('#join').clear();
    //Confirm edit field is disabled
    const bool = await page.locator('#noEdit').isDisabled();
    console.log("Is Disabled : " + bool)
    //confirm this field readonly ( isDisabled also use here)
    const readOnly = await page.locator('#dontwrite').isEditable();
    expect(readOnly).toBeFalsy;


})

test('Buttons', async({page})=>{
    await page.goto("https://letcode.in/button");
    //Goto Home and come back here using driver commanda
    await page.locator('#home').click();
    await page.goBack();
    
    //Get the X & Y co-ordinates
    const location = page.locator('#position');
    const box = await location.boundingBox();
    console.log("X : ",box.x , `Y: ${box.y}`);

    //Find the color of the button
    const colorfield = page.locator('#color');
    const bgColor = await  colorfield.evaluate(
        el=>(
        getComputedStyle(el).backgroundColor
    ));
    console.log("Background Color : " , bgColor);

    //Find the height & width of the button
    const heighAndWidth = page.locator('#property');
    const heighAndWidthBox = await heighAndWidth.boundingBox();
    console.log("Height : ",  heighAndWidthBox.height, `Width:${heighAndWidthBox.width}`);

    //Confirm button is disabled
    const disabledBtn = page.locator("[title*='Disabled']");
    await disabledBtn.isDisabled();

    //click and hold btn
    const clickNHold = page.locator('#isDisabled h2');
    await clickNHold.click({delay:2000});
  
    await page.pause();


})

test('Dropdowns', async({page})=>{
    await page.goto('https://letcode.in/dropdowns');
    //Select the apple using visible text
    await page.waitForLoadState('networkidle');

    const fruit = 'Apple';
    const fruitsDropdown = page.locator('#fruits');
    await fruitsDropdown.selectOption({label : fruit}); //works fine

    const superheros = page.locator('#superheros');
    const isMulti = await superheros.evaluate(el=> el.multiple);
    console.log('Is Multiple : ' , isMulti)

    await superheros.selectOption([{label: 'Batman'}, {index : 5}, {value : 'bp'}])

    //Select the last programming language and print all the options
    const lang = page.locator('#lang');
    const allLang = await lang.allTextContents();
    console.log("All lang are :  " , allLang);
    await lang.selectOption({label: 'C#'});


    //Select India using value & print the selected value
    const country = page.locator('#country');
    await country.selectOption({label : "India"});
    console.log("Selected country is : ", await country.inputValue());




    // await fruitsDropdown.click(); // CLicking in select dropdown not working
    // const fruitsDropdownValues = page.locator('#fruits option');
    // await fruitsDropdownValues.first().waitFor();
    // const fruitsCount = await fruitsDropdownValues.count();
    // for(let i = 0 ; i <fruitsCount;i++){
    //     const selectFruit = await fruitsDropdownValues.nth(i).textContent();
    //     if(fruit.toLowerCase() === selectFruit.toLowerCase()){
    //         await fruitsDropdownValues.nth(i).click();
    //         break;
    //     }
    // }
    await page.pause();
})

test('Alerts pending', async({page})=>{
    await page.goto('https://letcode.in/alert');
    //Select the apple using visible text
    await page.waitForLoadState('networkidle'); 



const [dialog] = await Promise.all([
  page.waitForEvent('dialog'),
  page.locator('#accept').click(),
]);

console.log('Alert message:', dialog.message());
await dialog.accept();
 // PROOF the alert is closed
  await expect(page.locator('#accept')).toBeVisible();



    //const simpleAlert = page.locator('#accept');
    // page.on('dialog',async dialog =>{
    //     //await page.waitForTimeout(2000);
    //     console.log("Alert message for simple alert : ", dialog.message());
    //     await dialog.accept();
    // });
    // await page.locator('#accept').click();
/*
// No suite for multiple alerts in same page
    //Dismiss the Alert & print the alert text
    page.on('dialog', async dialog =>{
        console.log("Alert message for dismiss: ",dialog.message());
        await page.waitForTimeout(1200);
        await dialog.dismiss();
    })
    await page.locator('#confirm').click();

*/
    await page.pause();
})
test('Frames', async({page})=>{
    await page.goto('https://letcode.in/frame');
    //Select the apple using visible text
    await page.waitForLoadState('networkidle'); 

    const frame =  page.frameLocator('#firstFr');

    //await frame.locator("input[name='fname']").waitFor({state: 'visible'});
    const fname = frame.locator("input[name='fname']")
    await fname.fill('Kuppa')
    await page.frameLocator('#firstFr').locator("input[name='lname']").fill("Kuppas")

    const innerFrame = frame.frameLocator("[src*='innerframe']");
    await innerFrame.locator('input[name="email"]').fill('gopal@test.com')



    await page.pause();
})

test('table', async({page})=>{
    await page.goto('https://letcode.in/table');
    const name = 'Raj'
    const table = page.locator('#simpletable tbody ');
    const rows = page.locator('#simpletable tbody tr');
    await rows.first().waitFor();
    for(let i = 0 ; i < await rows.count(); i ++){
        const rowText = await rows.nth(i).locator('td').allTextContents();
        console.log("Row text : " + rowText)

        if(rowText.includes(name)){
            await rows.nth(i).locator("[type='checkbox']").click();
            break;
        }
    }
    await page.pause();


})



test('Simple table', async({page})=>{
    await page.goto('https://letcode.in/table');
    //const name = 'Raj'
    
    //await rows.first().waitFor();

    const prices =await page.locator('#shopping tbody tr td:nth-child(2)').allTextContents();
    let sum =0;

    for(const price of prices){
        sum += Number(price)
    }

    console.log("Sum of all numbers = " ,sum)

    const fTtotalValue = await page.locator('#shopping tfoot td:nth-child(2)').textContent();
    expect(Number(fTtotalValue)).toEqual(sum)

    await page.pause();


})


test("Alert Practice", async ({ page }) => {
  await page.goto('https://letcode.in/alert');
  const simpleAlertBtn = page.locator("#accept");
  await simpleAlertBtn.scrollIntoViewIfNeeded();

  const [simpleAlert] = await Promise.all([
    page.waitForEvent('dialog'),
    simpleAlertBtn.click({force:true})
  ]);

  console.log(simpleAlert.message());
  await simpleAlert.accept();

});

test("Windows Practice", async ({ page }) => {
  await page.goto('https://letcode.in/window');

  const simpleAlertBtn = page.locator("#home");
  await simpleAlertBtn.click();
  console.log(await page.title());

  await page.goBack();

  const multiWIndow = page.locator('#multi');

  //wait for new page
  const [newPage] = await Promise.all([
     page.waitForEvent('popup'), //Same page , new window tab
     multiWIndow.click(),
  ])

    // const [newPage] = await Promise.all([
    //     context.waitForEvent('page'),
    //     await multiWIndow.click(),
    // ])

  console.log(await newPage.title());

//   const [simpleAlert] = await Promise.all([
//     page.waitForEvent('dialog'),
//     simpleAlertBtn.click({force:true})
//   ]);

//   console.log(simpleAlert.message());
//   await simpleAlert.accept();

});

test.only('Forms', async({page})=>{
    await page.goto('https://letcode.in/forms');
    await page.locator('#firstname').fill('Test')
})