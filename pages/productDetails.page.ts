import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductDetails extends BasePage{
    readonly productTitle: Locator = this.page.getByTestId('product-name');
    readonly productPrice: Locator = this.page.getByTestId('unit-price');
    readonly addToCartButton: Locator = this.page.getByTestId('add-to-cart');
    readonly addToFavourites: Locator = this.page.getByTestId('add-to-favorites');

    
}