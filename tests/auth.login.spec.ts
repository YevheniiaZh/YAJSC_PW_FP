import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import path from 'path';
import { validUserCredentials } from './test.data/login';


test('login', async({ page }) => {
  test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

  const authFile = path.join(__dirname, '../playwright/.auth/user.json');

  const loginPage = new LoginPage(page);
  await loginPage.navigateToPage('/auth/login');
  await loginPage.performLogin(validUserCredentials.email, validUserCredentials.password);
  await expect(page).toHaveURL('/account');

  await page.context().storageState({ path: authFile });
});

