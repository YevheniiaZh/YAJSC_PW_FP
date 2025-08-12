import { test, expect } from '@playwright/test';

const user_email = 'customer@practicesoftwaretesting.com';
const user_password = 'welcome01';
const user_name = 'Jane Doe';

test('login', async ({ page }) => {
  test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');
  
  await page.goto('/auth/login');
  
  await page.getByTestId('email').fill(user_email);
  await page.getByTestId('password').fill(user_password);
  await page.getByRole('button', { name: 'Login' }).click();
 
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toContainText('My account');
  await expect(page.getByTestId('nav-menu')).toContainText(user_name);



  
});

