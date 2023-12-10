import {test, expect} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('https://dev.otivo.com');

    //confirming landed on the right page
    await expect(page).toHaveTitle("Otivo. Be better off.");

    await page.waitForSelector('[data-test="sideBarBtn"]');
    await page.click('[data-test="sideBarBtn"]');

    await page.click('div:text("Sign in")');
})

test.afterEach(async({page})=>{
    await page.waitForSelector('h3:text(" Linked Provider")');

    await page.waitForSelector('[data-test="sideBarBtn"]');
    await page.click('[data-test="sideBarBtn"]');

    await page.click('div:text("Log out")');

    await page.close();
})

test.describe('Create new user and login as existing user',()=>{
    //workflow 1
    test('create new user',async({page})=>{

        //confirming sign up button appears before clicking
        await page.waitForSelector('[class="cd3c46016 c9c0fbffe"]');

        await page.click('a:text("Sign up")');

        /*generating a random number to use as part of sign up email to avoid email already taken
        error*/
        const min = 123;
        const max = 1347486584738;
        const randomNumber: number = Math.floor(Math.random() * (max - min)) + min;        

        const emailAddressInput = 'input[name="email"]';
        await page.fill(emailAddressInput, `testingguy${randomNumber}@testing.com`);

        const passwordInput = 'input[name="password"]';
        await page.fill(passwordInput, 'wElc0me78');

        //confirms password requirements box has appeared before submitting
        await page.waitForSelector('li[class="cb73b41bc ce23a19fb"]');

        await page.click('button[data-action-button-primary="true"]:text("Continue")');

    })

    //workflow 2
    test('login as existing user',async({page})=>{
        const emailAddressInput = 'input[name="username"]';
        await page.fill(emailAddressInput, `testguy540@test.com`);

        const passwordInput = 'input[name="password"]';
        await page.fill(passwordInput, 'wElc0me1');

        await page.click('button[data-action-button-primary="true"]:text("Continue")');     
    })
})
