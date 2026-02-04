const {test,expect}= require('@playwright/test');

test('Validate calender', async({page})=>{
    const year = '2027';
    const date = '13';
    const month = '12';
    const expectedList = [month,date,year];

    const datepicker = page.locator('.react-date-picker__inputGroup');
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await datepicker.click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months button').nth(month-1).click();
    await page.locator('.react-calendar__month-view__days button').getByText(date).click();
    //Assertion
    await page.locator('.react-date-picker__inputGroup').click();
    const input = page.locator('.react-date-picker__inputGroup__input');
    for(let i =0; i<expectedList.length;i++){
        const value = await input.nth(i).inputValue();
        expect(value).toEqual(expectedList[i])
    }


    await page.pause();
    //react-calendar__viewContainer react-calendar__decade-view__years



})