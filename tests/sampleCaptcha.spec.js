import{test,expect} from '@playwright/test'
import { createWorker } from 'tesseract.js';


test('OCR captcha reader', async({page})=>{
    const division = '10000 - HEAD OFFICE';
    await page.goto("http://192.169.1.91/ziva/GI.Common/Home/Login.aspx");
    await page.locator("#txtUserID").fill('admin');
    await page.locator("#txtPwd").fill('shriram@2');
    await page.locator('#txtDivision').pressSequentially('1000');
    await page.locator('.ui-autocomplete a').getByText(division).click();
    


    const img =  page.locator('#imgCaptcha');
     // Take screenshot
    await img.screenshot({path:'ocr-img.png'});

    //ocr
    const worker =  await createWorker();
    await worker.load();
    await worker.reinitialize('eng')

    const {data} = await worker.recognize('ocr-img.png');
    await page.locator('#txtCaptcha').fill(data.text);
    console.log('Ocr result: ' , data.text)
   // await page.locator("#txtCaptcha").fill(data.text)
    await page.locator('.btn-section input[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("input[placeholder='Menu Search']")).toBeVisible();
    await page.locator("input[placeholder='Menu Search']").fill("Mis report")
    await page.pause();
})