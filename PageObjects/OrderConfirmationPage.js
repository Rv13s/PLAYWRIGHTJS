import { expect } from "@playwright/test";
class OrderConfirmationPage{
    constructor(page){
        this.page = page;
        
        this.orderConfirmationMessage = page.locator('.hero-primary');
        this.orderID = page.locator('.box .em-spacer-1 .ng-star-inserted');
    }

async assertOrderConfrimation(orderText){
    await expect(this.orderConfirmationMessage).toBeVisible();
    await expect(this.orderConfirmationMessage).toHaveText(orderText);
    await expect(this.orderID.first()).toBeVisible();
    console.log('Confrimation msg : ' + await this.orderConfirmationMessage.textContent());
}

async getOrderID(){
     await this.orderID.first().waitFor();
     const rawOrderIDNumber = await this.orderID.first().textContent();
     const orderIDNumber = rawOrderIDNumber.split("|")[1].trim();
// let a =' | 697a0ec5c941646b7ac073cb | ';
// const orderId = a.split('|')[1].trim()
// console.log(orderId)
     console.log("OrderID from Order confirmation page : "+orderIDNumber)
     return orderIDNumber;
}

}
module.exports = {OrderConfirmationPage}