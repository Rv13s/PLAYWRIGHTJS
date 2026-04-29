import{test} from '@playwright/test'

test.use({
  geolocation: { latitude: 13.0827, longitude: 80.2707 }, // Chennai
  permissions: ['geolocation'],
});

test('Iplanet', async({page})=>{
    await page.goto('https://iplanet.one/');
    const prod = 'iphone 16'
    const searchBox = page.locator('#Search-In-Modal:visible');
    await searchBox.fill('Iphone 16');
    const results = page.locator('#predictive-search-results-queries-list');
    await results.locator('li').first().waitFor();
    const resultCount = await results.locator('li').count();

    for(let i = 0; i<resultCount; i++){
      const prodText = await results.locator('li').nth(i).textContent();
      if(prod === prodText.trim().toLowerCase()){
         await results.locator('li').nth(i).click();
        break;
      }
    }

    await page.pause();
})  