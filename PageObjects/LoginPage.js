class LoginPage{

    constructor(page){
        this.page = page;
        this.emailField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    }

    async goTO(url){
        await this.page.goto('https://rahulshettyacademy.com/client/auth/login')
    }
  
    async ValidLogin(email,passsword){
        await this.emailField.fill(email);
        await this.passwordField.fill(passsword);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
    

}
module.exports = {LoginPage};