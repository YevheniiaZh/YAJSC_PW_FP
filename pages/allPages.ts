import { Page } from '@playwright/test';
import { AccountPage } from './account.page';
import { CartPage } from './cart.page';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { ProductDetails } from './productDetails.page';

export class AllPages {
readonly  loginPage: LoginPage;
readonly  accountPage: AccountPage;
readonly  homePage: HomePage;
readonly  productDetailsPage: ProductDetails;
readonly  cartPage: CartPage;


    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.homePage = new HomePage(page);
        this.productDetailsPage = new ProductDetails(page);
        this.cartPage = new CartPage(page);
    }
}