import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { validUserCredentials } from './test.data/login';

test('user login with valid credentials', async({ page }) => {
  test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

  const loginPage = new LoginPage(page);

  await loginPage.navigateToPage('/auth/login');
  await loginPage.performLogin(validUserCredentials.email, validUserCredentials.password);

  await expect(page).toHaveURL('/account');
  const accountPage = new AccountPage(page);
  await expect(accountPage.pageTitle).toContainText('My account');
  await expect(accountPage.header.navMenuUser).toContainText(validUserCredentials.userName);

});

