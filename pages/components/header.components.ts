import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly navMenuUser: Locator;
  readonly navCart: Locator;
  readonly navCartQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenuUser = this.page.getByTestId('nav-menu');
    this.navCart = this.page.getByTestId('nav-cart');
    this.navCartQuantity = this.page.getByTestId('cart-quantity');
  }


}
