import { Locator, Page } from "@playwright/test";

export class HeaderComponent {
    readonly page: Page;
     readonly navMenuUser: Locator;
     
     constructor(page: Page){
        this.page = page;
        this.navMenuUser = this.page.getByTestId('nav-menu');
     }
     


}