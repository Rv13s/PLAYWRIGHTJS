import{test} from '@playwright/test'
test('exp', async({page})=>{
    await page.goto('https://letcode.in/alert');
 
    
    
        page.on('dialog',async dialog=>{
            await dialog.accept()
        })
    await page.locator('#accept').click();


})