const{test} = require('@playwright/test');
const {PomManager} = require('../PageObjects/PomManager');

//const dataset = JSON.parse( JSON.stringify (require('../utils/E2EPOM.json')));
const dataset = require('../utils/E2EPOM.json')

test('E2E with POM manager, Json data', async({page})=>{

    const url = "https://rahulshettyacademy.com/client/auth/login";

    const pomManager = new PomManager(page);
    
    const loginPage =  pomManager.getLoginPage();
    const dashboard = pomManager.getDashboardPage();
    const cartPage =  pomManager.getCartPage();
    const paymentPage = pomManager.getPaymentPage();
    const orderConfirmationPage = pomManager.getOrderConfirmationPage();
    const ordersPage = pomManager.getOrdersPage();

    //const loginPage = new LoginPage(page);
    await loginPage.goTO(url);
    await loginPage.ValidLogin(dataset.email,dataset.password);

    //DashBoard Page 
    await dashboard.assertDashboardPageLoaded();
    await dashboard.searchProductAndAddToCart(dataset.productName);
    
    //Cart Section  
    await cartPage.navigateToCartPage(dataset.productName);

    //Payment section 
    await paymentPage.placeOrder(dataset.countryName);

    //OrdersConfirmation Page  
    await orderConfirmationPage.assertOrderConfrimation(dataset.orderText);
    const orderIDNumber =  await orderConfirmationPage.getOrderID();
    console.log("Order iD in test File: " + orderIDNumber);

    //OrdersPage  
    await ordersPage.checkMyOrders(orderIDNumber);

    await page.pause();

})
