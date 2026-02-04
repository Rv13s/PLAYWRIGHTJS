class PaymentPage{

    constructor(page){
        this.page = page;
        this.selectCounty = page.getByPlaceholder('Select Country');
        this.dropdownList = page.locator('.ta-results');
        this.placeOrderbtn =  page.getByText('Place Order ');
    }



async placeOrder(countryName){ 

    await this.selectCounty.pressSequentially("Ang", {delay:150}); 
    const dropdownListCount = await this.dropdownList.count();
    await this.dropdownList.waitFor();

    for(let i = 0; i<dropdownListCount;i++){
        const values =await this.dropdownList.locator('button').nth(i).textContent();
       // console.log("Country values: " +values)
        if( values.trim() === countryName){
            await this.dropdownList.locator('button').nth(i).click();
            break;
        }
    }
    //Proceed the order 
    await this.placeOrderbtn.click();

    }

}


module.exports = {PaymentPage}