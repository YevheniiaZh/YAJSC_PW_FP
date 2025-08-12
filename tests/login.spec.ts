import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');
  
  await page.goto('/auth/login');
  
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByRole('button', { name: 'Login' }).click();
 
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toContainText('My account');
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');



  
});

