const {test,expect, chromium} = require("@playwright/test");

test.skip('Get landing page product Title', async()=>{
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
    await page.locator('.card-body b').first().waitFor(); 
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

test.only('Add to cart Exercise', async({page})=>{
    const emailIDField = page.locator('#userEmail');
    const passwordField = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const signOutBtn = page.getByRole('button',{name:' Sign Out '});
    const allProductsCards = page.locator('.card-body');
   
    const allTitle = allProductsCards.locator('b');

    const cart = page.locator("[routerlink*='cart']");
    const email = 'testra@gmail.com';
    const password ="Test@123";
    const buy = 'iphone 13 pro'
    //Go to Url
    await page.goto('https://rahulshettyacademy.com/client/auth/login');


    await emailIDField.pressSequentially(email, );
    await passwordField.fill(password);
    await loginBtn.click();
    // Check page is landing on Home Page
    await expect(page).toHaveURL(/dashboard/);
    await expect(signOutBtn).toBeVisible();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    console.log(await allTitle.first().textContent())
    console.log(await allTitle.allTextContents());
    const prodCount = await allProductsCards.locator('b').count();

    console.log(prodCount)
    
    // Add iphone 13 pro to the cart
    for(let  i = 0; i<prodCount;++i){
    
        if( await allProductsCards.nth(i).locator('b').textContent() === buy){
        
            await allProductsCards.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }

    // Check the selected product added in the cart section
    const cartSection = page.locator('.cart');
    const cartTitles = cartSection.locator('.cart h3');
    const cartList = page.locator('div li');
    const prodInCart = cartSection.locator('h3', {hasText : buy});
    const checkoutBtn = page.getByRole('button', {name: 'Checkout'});

    
    //const cartCount = await cartTitles.count();
    await cart.click();
    //await cartList.first().waitFor();
    await expect(prodInCart).toBeVisible();
    
    //click checkout and done payment
  
    await checkoutBtn.click();

    //select country
    const selectCounty = page.getByPlaceholder('Select Country');
    const countryName = 'Angola';
    await selectCounty.pressSequentially("Ang", {delay:150});
    
    const dropdownList = page.locator('.ta-results');
    const dropdownListCount = await dropdownList.count();
    await dropdownList.waitFor();

    for(let i = 0; i<dropdownListCount;i++){
        const values =await dropdownList.locator('button').nth(i).textContent();
       // console.log("Country values: " +values)
        if( values.trim() ==='Angola'){
            await dropdownList.locator('button').nth(i).click();
            break;
        }
    }

    //Proceed the order 
    const placeOrder =  page.getByText('Place Order ');
    await placeOrder.click();

    const orderText = ' Thankyou for the order. ';
    const orderConfirmationMessage = page.locator('.hero-primary');
    const orderID = page.locator('.box .em-spacer-1 .ng-star-inserted');

    
    await expect(orderConfirmationMessage).toBeVisible();
    await expect(orderConfirmationMessage).toHaveText(orderText);
    await expect(orderID.first()).toBeVisible();
    console.log('Confrimation msg : ' + await orderConfirmationMessage.textContent());

    //console.log('Order ID : ' + await orderID.allTextContents());
    //const orderIDNumber = await orderID.allTextContents();
    const orderIDNumber = await orderID.textContent();
    console.log(orderIDNumber)


    const ordersButton = page.locator("button[routerlink*='myorders']"); // [routerlink*='myorders']
    await ordersButton.click();
   // await page.waitForLoadState('networkidle');
    const table = page.locator('table');
    await table.waitFor();
    const rows = page.locator('tbody tr'); //tbody tr remover the header
    
    console.log(await rows.count());

    for ( let i = 0 ; i<await rows.count(); i++){
        const row =  rows.nth(i);
        const rowID =  await row.locator('th').textContent();
        if(orderIDNumber.includes(rowID)){
            await row.locator('button', {hasText: "View"}).click();
            break;
        }
    }

//Order view
    const orderViewID = await  page.locator('div .col-text').textContent();
    //await orderViewID.waitFor({state:"visible"});
    //const orderViewIDText =  await orderViewID.textContent();
    
    expect(orderIDNumber.includes(orderViewID)).toBeTruthy();


    await page.pause();







})

test('E2E add to cart using playwright Spl locators', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/auth/login');
    await page.getByPlaceholder('email@example.com').fill('testra@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Test@123');
    await page.getByRole("button", {name:'login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await expect(page.getByText("Automation Practice")).toBeVisible();
    await page.locator('.card-body').filter({hasText:'ZARA COAT 3'}).getByRole("button", {name:'Add To Cart'}).click();
    await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
    //assert
    await page.locator('div li').first().waitFor();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();

    await page.getByRole("button",{name:'Checkout'}).click();
    await page.getByPlaceholder('Select Country').pressSequentially("Ind");
     //await page.locator('.ta-results').getByRole("button",{name:' India'}).first().highlight(); 
   await page.locator('.ta-results .ta-item span', { hasText: /^ India$/ }).click();
    await page.getByText('Place Order ').click();
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();
    const orderIDRaw = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const orderId = orderIDRaw.split('|')[1].trim();
    console.log(orderId)
    await page.getByRole('listitem').getByRole("button", {name: 'Orders'}).click();
    await page.locator('.table tbody th').first().waitFor();
    await page.locator('.table tbody tr').getByText(orderId).highlight();
    const row =  page.locator('.table tbody tr',{has:page.locator('th',{hasText:orderId})});
    await row.getByRole('button',{name:'View'}).highlight();
    await row.getByRole('button',{name:'View'}).click();
    
    await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();
    await expect(page.getByText(orderId)).toBeVisible();
    // 4727393521329170
    // 01/31
    


    await page.pause();


})

