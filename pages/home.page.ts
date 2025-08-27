import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly productTitle: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly sortSelect: Locator = this.page.getByTestId('sort');


  async selectSortOption(value: string): Promise<void> {
        await this.sortSelect.selectOption(`${value}`);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForResponse(res =>
          res.url().includes('/products') && res.status() === 200,
  );
    };

    async selectCategoryCheckbox(name: string): Promise<void> {
        await this.page.getByRole('checkbox', { name: `${name}` }).check();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForResponse(res =>
          res.url().includes('/products') && res.status() === 200,
  );
    };
}
