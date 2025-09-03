import { expect } from '@playwright/test';
import { validUserCredentials } from './test.data/login';
import { test } from '../fixtures/fixtures';

test('user login with valid credentials', async({ app }) => {
  test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

  await app.loginPage.navigateToPage('/auth/login');
  await app.loginPage.performLogin(validUserCredentials.email, validUserCredentials.password);

  await app.loginPage.expectUrl(/\/account/);

  await expect(app.accountPage.pageTitle).toContainText('My account');
  await expect(app.accountPage.header.navMenuUser).toContainText(validUserCredentials.userName);

});