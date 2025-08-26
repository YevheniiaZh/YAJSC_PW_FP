import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

  emailInput: Locator = this.page.getByTestId('email');
  passwordInput: Locator = this.page.getByTestId('password');
  loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

  async performLogin(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
