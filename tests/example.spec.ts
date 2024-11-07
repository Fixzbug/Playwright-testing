import { test, expect } from '@playwright/test';
import { error, log } from 'console';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });


test('get started link', async ({ page }) => {

  let title = 'Swag Labs';
  let url = 'https://www.saucedemo.com/'

  await page.goto(url);
  await expect(page.getByText(title)).toBeVisible();
  
  await page.fill('#user-name', 'standard_user'); // Replace 'your-username' with the actual username
  await page.fill('#password', 'secret_sauce'); // Replace 'your-username' with the actual username

  await expect(page.getByText('Login')).toBeVisible().then(async()=>{
    await page.click('#login-button');
    await page.selectOption('.product_sort_container', 'lohi'); // 'lohi' is for "Price (low to high)"
  }).catch(error=>{
    console.log(error);
  })

  // await page.close();
  
  
  // await page.click('#login-button').then(async ()=>{
  //   await page.getByText('Epic sadface: Username is required').isVisible()
  // })


  // // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // // Expects page to have a heading with the name of Installation.
});
