const{expect} = require('@playwright/test');
class OrdersPage{
    constructor(page){
        this.page = page;
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.table = page.locator('table');
        this.rows = page.locator('tbody tr'); //tbpdy remover the header
    }

async checkMyOrders(orderIDNumber){
    console.log('Order ID received:', orderIDNumber);
    //check myOrder in orders page
    await this.ordersButton.click();
    await this.table.waitFor();
    const rowCount = await this.rows.count();
    console.log("rowCount: " +  rowCount);

    for ( let i = 0 ; i < await this.rows.count(); i++){
        const row =  this.rows.nth(i);
        const rowID =  await row.locator('th').textContent();
        //console.log(rowID)
        if(orderIDNumber.includes(rowID)){
            await row.locator('button', {hasText: "View"}).click();
            break;
        }
    }


    const orderViewID = await  this.page.locator('div .col-text').textContent();
    //await orderViewID.waitFor({state:"visible"});
    //const orderViewIDText =  await orderViewID.textContent();
    
    expect(orderIDNumber.includes(orderViewID)).toBeTruthy();
    console.log(" Test complete I know its hard coded")
    }

}
module.exports = {OrdersPage}