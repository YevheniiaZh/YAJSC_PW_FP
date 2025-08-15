import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage{
    readonly productCard: Locator = this.page.getByTestId('product-name');
}