import  { test, expect} from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductDetails } from "../pages/productDetails.page";

test ('user can view product details', async({page}) =>{
    const homePage = new HomePage(page);
    const searchedProductName = 'Combination Pliers';
    const searchedProductPrice = '14.15'

await homePage.navigateToPage('');

await expect (homePage.productCard).not.toHaveCount(0);
await homePage.productCard.getByText(searchedProductName).click();

await expect(page).toHaveURL(new RegExp('.*/product/.*'));
const productDetails = new ProductDetails(page);
await expect(productDetails.productTitle).toContainText(searchedProductName);
await expect(productDetails.productPrice).toContainText(searchedProductPrice);
await expect(productDetails.addToCartButton).toBeVisible();
await expect(productDetails.addToFavourites).toBeVisible();




});