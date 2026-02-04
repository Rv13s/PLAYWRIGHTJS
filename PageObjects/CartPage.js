const{expect} = require('@playwright/test')
class CartPage{
    constructor(page){
        this.page = page;
        this.cart = page.locator("[routerlink*='cart']");
        this.cartSection = page.locator('.cart');
        this.cartTitles = this.cartSection.locator('.cart h3');
        this.cartList = page.locator('div li');
        //this.prodInCart = this.cartSection.locator('h3', {hasText : productName});
        this.checkoutBtn = page.getByRole('button', {name: 'Checkout'});
    }

    prodInCart(productName){
        return  this.cartSection.locator('h3', {hasText: productName});
        ;
    }

    async navigateToCartPage(productName){
    await this.cart.click();
    await expect(this.prodInCart(productName)).toBeVisible(); 
    //click checkout and done payment
    await this.checkoutBtn.click();
    }

}
module.exports = {CartPage}