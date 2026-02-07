const {LoginPage} = require('./LoginPage');
const {DashboardPage}= require('../PageObjects/DashboardPage');
const { CartPage } = require("../PageObjects/CartPage");
const { PaymentPage } = require("../PageObjects/PaymentPage");
const { OrderConfirmationPage } = require("../PageObjects/OrderConfirmationPage");

const { OrdersPage } = require("../PageObjects/OrdersPage");

class PomManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

getLoginPage(){
    return this.loginPage ??= new LoginPage(this.page);
}
getDashboardPage(){
    return this.dashboardPage;
}
getCartPage(){
    return this.cartPage;
}
getPaymentPage(){   
    return this.paymentPage;
}
getOrderConfirmationPage(){
    return this.orderConfirmationPage;
}
getOrdersPage(){
    return this.ordersPage;
}


}
module.exports = {PomManager}