import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { HeaderComponent } from "./components/header.components";

export class AccountPage extends BasePage{
    readonly pageTitle: Locator = this.page.getByTestId('page-title');
    readonly header: HeaderComponent = new HeaderComponent(this.page);
}