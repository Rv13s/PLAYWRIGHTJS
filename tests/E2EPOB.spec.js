const {test,expect} = require("@playwright/test");
const {LoginPage}  = require('../PageObjects/LoginPage');
const {DashboardPage}= require('../PageObjects/DashboardPage');
const { CartPage } = require("../PageObjects/CartPage");
const { PaymentPage } = require("../PageObjects/PaymentPage");
const { OrdersPage } = require("../PageObjects/OrdersPage");
const { OrderConfirmationPage } = require("../PageObjects/OrderConfirmationPage");


test.only('Add to cart Exercise', async({page})=>{
    const url = "https://rahulshettyacademy.com/client/auth/login";
    const email = 'testra@gmail.com';
    const password ="Test@123";
    const productName = 'iphone 13 pro'
    const countryName = 'Angola';
    const orderText = ' Thankyou for the order. ';
    
    //LoginPage class 
    const loginPage = new LoginPage(page);
    await loginPage.goTO(url);
    await loginPage.ValidLogin(email,password);

    //DashBoard Page
    const dashboard = new DashboardPage(page);
    await dashboard.assertDashboardPageLoaded();
    await dashboard.searchProductAndAddToCart(productName);
    
    //Cart Section
    const cartPage =  new CartPage(page);
    await cartPage.navigateToCartPage(productName);

    //Payment section
    const paymentPage = new PaymentPage(page);
    await paymentPage.placeOrder(countryName);

    //OrdersConfirmation Page
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await orderConfirmationPage.assertOrderConfrimation(orderText);
    const orderIDNumber =  await orderConfirmationPage.getOrderID();
    console.log("Order iD in test File: " + orderIDNumber);

    //OrdersPage
    const ordersPage = new OrdersPage(page);
    await ordersPage.checkMyOrders(orderIDNumber);

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

