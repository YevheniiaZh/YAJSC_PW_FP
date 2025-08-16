import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

 const user_email = 'customer@practicesoftwaretesting.com';
 const user_password = 'welcome01';
 const user_name = 'Jane Doe';

test('login', async ({ page }) => {
  test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');
  
  const loginPage = new LoginPage(page);

  await loginPage.navigateToPage('/auth/login');

  await loginPage.performLogin(user_email, user_password);
 
  await expect(page).toHaveURL('/account');
  const accountPage = new AccountPage(page);
  await expect(accountPage.pageTitle).toContainText('My account');
  await expect(accountPage.header.navMenuUser).toContainText(user_name);

});

