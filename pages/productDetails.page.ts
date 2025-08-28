import { Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from './components/header.components';

export class ProductDetails extends BasePage {
  readonly productTitle: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('unit-price');
  readonly addToCartButton: Locator = this.page.getByTestId('add-to-cart');
  readonly addToFavourites: Locator = this.page.getByTestId('add-to-favorites');
  readonly productAddedAlert: Locator = this.page.getByRole('alert', { name: 'Product added to shopping' });
  readonly header: HeaderComponent = new HeaderComponent(this.page);

}
