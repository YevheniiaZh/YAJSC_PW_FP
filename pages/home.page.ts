import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly productTitle: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly sortSelect: Locator = this.page.getByTestId('sort');


  async selectSortOption(value: string) {
        await this.sortSelect.click();
        await this.sortSelect.selectOption(`${value}`);
        await this.page.waitForLoadState('domcontentloaded');
        //before adding additional time, waiting for load state seemed to be not enough
        await this.page.waitForTimeout(1000);
    };

    async selectCategoryCheckbox(name: string) {
        await this.page.getByRole('checkbox', { name: `${name}` }).check();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
    };

    getSortedProduct(productSortingParam: string[], sortOrder: 'asc' | 'desc'): string[] {
    const sortedProducts = [...productSortingParam].sort((a, b) => a.localeCompare(b));
    return sortOrder === 'desc' ? sortedProducts.reverse() : sortedProducts;
  }

}
