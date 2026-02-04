//import { expect } from '@playwright/test';
const{expect} = require('@playwright/test')
class DashboardPage{
    constructor(page){
        this.page = page;
        this.signOutBtn = page.getByRole('button',{name:' Sign Out '});
        this.allProductCards = page.locator('.card-body');
        //this.allProductsTitle = allProductCards.locator('b');
        this.allProductsTitle = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
    }
async assertDashboardPageLoaded(){
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.signOutBtn).toBeVisible();
}

async searchProductAndAddToCart(productName){
    await this.allProductsTitle.first().waitFor();
    console.log(await this.allProductsTitle.allTextContents());
    const prodCount = await this.allProductsTitle.count();
    console.log(prodCount) 
    // Add {productName : iphone 13 pro} to the cart
    for(let  i = 0; i<prodCount;++i){  
        if( await this.allProductCards.nth(i).locator('b').textContent() === productName){    
             await this.allProductCards.nth(i).locator('text= Add To Cart').click();
             break;
        }
    } 
    await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {DashboardPage};