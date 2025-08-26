import  { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetails } from '../pages/productDetails.page';
import { CartPage } from '../pages/cart.page';
import { SortOption, SortOrder } from '../pages/enums/sorting.options';
import { PowerTools } from '../pages/enums/filter.categories';

// Test data
const testProducts = {
  combinationPliers: {
    title: 'Combination Pliers',
    price: '14.15',
  },
  slipJointPliers: {
    title: 'Slip Joint Pliers',
    price: '9.17',
  },
};

test ('user can view product details', async({ page }) =>{
  const homePage = new HomePage(page);
  await homePage.navigateToPage('');
  await expect (homePage.productTitle).not.toHaveCount(0);
  await homePage.productTitle.getByText(testProducts.combinationPliers.title).click();

  await expect(page).toHaveURL(/\/product/);
  const productDetails = new ProductDetails(page);
  await expect(productDetails.productTitle).toContainText(testProducts.combinationPliers.title);
  await expect(productDetails.productPrice).toContainText(testProducts.combinationPliers.price);
  await expect(productDetails.addToCartButton).toBeVisible();
  await expect(productDetails.addToFavourites).toBeVisible();
});


test('Verify user can add product to cart', async({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToPage('');
  await expect (homePage.productTitle).not.toHaveCount(0);
  await homePage.productTitle.getByText(testProducts.slipJointPliers.title).click();

  await expect(page).toHaveURL(/\/product/);
  const productDetails = new ProductDetails(page);
  await expect(productDetails.productTitle).toContainText(testProducts.slipJointPliers.title);
  await expect(productDetails.productPrice).toContainText(testProducts.slipJointPliers.price);

  await productDetails.addToCartButton.click();

  await expect(productDetails.productAddedAlert).toBeVisible();
  await expect(productDetails.productAddedAlert).toContainText('Product added to shopping cart.');
  await expect(productDetails.productAddedAlert).toBeHidden({ timeout: 8000 });
  await expect(productDetails.header.navCartQuantity).toContainText('1');

  await productDetails.header.navCart.click();

  const cartPage = new CartPage(page);
  await expect(page).toHaveURL(/\/checkout/);
  await expect(cartPage.cartProductQuantity).toHaveValue('1');
  await expect(cartPage.cartProductTitle).toContainText(testProducts.slipJointPliers.title);
  await expect(cartPage.proceedToCheckoutButton).toBeVisible();

});

//sorting options from enum, that represent sorting dropdown on page
const sortNameOptions = [
{
    order: SortOrder.Ascending,
    value: SortOption.AscendingByName,
},
{
    order: SortOrder.Descending,
    value: SortOption.DescendingByName,
},
];

for (const sortOption of sortNameOptions) {
    test(`Verify user can sort product by name ${sortOption.order}`, async({ page }) =>{
        const homePage = new HomePage(page);
        await homePage.navigateToPage('');
        await expect (homePage.productTitle).not.toHaveCount(0);
        await homePage.selectSortOption(sortOption.value);

        const actualProductNames = await homePage.productTitle.allTextContents();
        const expectedSortedNames = homePage.getSortedProduct(actualProductNames, sortOption.order);

        expect(actualProductNames).toEqual(expectedSortedNames);
    });
 }

 const sortingPriceOptions = [
   {
    order: SortOrder.Ascending,
    value: SortOption.AscendingByPrice,
   },
   {
    order: SortOrder.Descending,
    value: SortOption.DescendingByPrice,
   },
 ];

 for (const sortOption of sortingPriceOptions) {
    test(`Verify user can sort product by price ${sortOption.order}`, async({ page }) =>{
         const homePage = new HomePage(page);
        await homePage.navigateToPage('');
        await expect (homePage.productTitle).not.toHaveCount(0);
        await homePage.selectSortOption(sortOption.value);

        const actualSortedProductPrices = await homePage.productPrice.allTextContents();
        const expectedSortedProductPrices = homePage.getSortedProduct(actualSortedProductPrices, sortOption.order);

        expect(actualSortedProductPrices).toEqual(expectedSortedProductPrices);
    });
 }

  test('Verify user can filter products by category', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage('');
        await expect (homePage.productTitle).not.toHaveCount(0);
        await homePage.selectCategoryCheckbox(PowerTools.Sander);
        const productNames: string[] = await homePage.productTitle.allTextContents();

        productNames.forEach(name =>{
            expect(name).toContain(PowerTools.Sander);
        });
    });
