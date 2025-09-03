import  { expect } from '@playwright/test';
import { SortOption, SortOrder } from '../pages/enums/sorting.options';
import { PowerTools } from '../pages/enums/filter.categories';
import { ArrayUtils } from '../helpers/array.utils';
import { test } from '../fixtures/app';

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

test ('user can view product details', async({ app }) =>{

  await app.homePage.navigateToPage('');
  await expect (app.homePage.productTitle).not.toHaveCount(0);
  await app.homePage.productTitle.getByText(testProducts.combinationPliers.title).click();

  await app.productDetailsPage.expectUrl(/\/product/);

  await expect(app.productDetailsPage.productTitle).toContainText(testProducts.combinationPliers.title);
  await expect(app.productDetailsPage.productPrice).toContainText(testProducts.combinationPliers.price);
  await expect(app.productDetailsPage.addToCartButton).toBeVisible();
  await expect(app.productDetailsPage.addToFavourites).toBeVisible();
});


test('Verify user can add product to cart', async({ app }) => {

  await app.homePage.navigateToPage('');
  await expect (app.homePage.productTitle).not.toHaveCount(0);
  await app.homePage.productTitle.getByText(testProducts.slipJointPliers.title).click();

  await app.productDetailsPage.expectUrl(/\/product/);

  await expect(app.productDetailsPage.productTitle).toContainText(testProducts.slipJointPliers.title);
  await expect(app.productDetailsPage.productPrice).toContainText(testProducts.slipJointPliers.price);

  await app.productDetailsPage.addToCartButton.click();

  await expect(app.productDetailsPage.productAddedAlert).toBeVisible();
  await expect(app.productDetailsPage.productAddedAlert).toContainText('Product added to shopping cart.');
  await expect(app.productDetailsPage.productAddedAlert).toBeHidden({ timeout: 8000 });
  await expect(app.productDetailsPage.header.navCartQuantity).toContainText('1');

  await app.productDetailsPage.header.navCart.click();

  await app.cartPage.expectUrl(/\/checkout/);
  await expect(app.cartPage.cartProductQuantity).toHaveValue('1');
  await expect(app.cartPage.cartProductTitle).toContainText(testProducts.slipJointPliers.title);
  await expect(app.cartPage.proceedToCheckoutButton).toBeVisible();

});

//sorting options from enum, that represent sorting dropdown on page
[
{
    order: SortOrder.Ascending,
    value: SortOption.AscendingByName,
},
{
    order: SortOrder.Descending,
    value: SortOption.DescendingByName,
},
].forEach(({ order, value }) =>{
  test(`Verify user can sort product by name ${order}`, async({ app }) =>{
        await app.homePage.navigateToPage('');
        await expect (app.homePage.productTitle).not.toHaveCount(0);
        await app.homePage.selectSortOption(value);

        const actualProductNames = await app.homePage.productTitle.allTextContents();
        const expectedSortedNames = ArrayUtils.getSortedProduct(actualProductNames, order);

        expect(actualProductNames).toEqual(expectedSortedNames);
    });
});


[
   {
    order: SortOrder.Ascending,
    value: SortOption.AscendingByPrice,
   },
   {
    order: SortOrder.Descending,
    value: SortOption.DescendingByPrice,
   },
 ].forEach(({ order, value }) =>{
  test(`Verify user can sort product by price ${order}`, async({ app }) =>{

        await app.homePage.navigateToPage('');
        await expect (app.homePage.productTitle).not.toHaveCount(0);
        await app.homePage.selectSortOption(value);

        const actualSortedProductPrices = await app.homePage.productPrice.allTextContents();
        const expectedSortedProductPrices = ArrayUtils.getSortedProduct(actualSortedProductPrices, order);

        expect(actualSortedProductPrices).toEqual(expectedSortedProductPrices);
    });
 });


  test('Verify user can filter products by category', async({ app }) => {

        await app.homePage.navigateToPage('');
        await expect (app.homePage.productTitle).not.toHaveCount(0);
        await app.homePage.selectCategoryCheckbox(PowerTools.Sander);
        const productNames: string[] = await app.homePage.productTitle.allTextContents();

        productNames.forEach(name =>{
            expect(name).toContain(PowerTools.Sander);
        });
    });
