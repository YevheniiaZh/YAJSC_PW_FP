import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { validUserCredentials } from './test.data/login';
import { CreditCardData } from './test.data/credit.cart.details';

test('Verify successful payment using loggedInApp fixture', async({ loggedInApp }) => {
    await loggedInApp.homePage.navigateToPage('');
    await expect(loggedInApp.accountPage.header.navMenuUser).toContainText(validUserCredentials.userName);
    await loggedInApp.homePage.productTitle.getByText('Combination Pliers').click();
    await loggedInApp.productDetailsPage.expectUrl(/\/product/);
    await loggedInApp.productDetailsPage.addToCartButton.click();
    await expect(loggedInApp.productDetailsPage.productAddedAlert).toBeHidden({ timeout: 8000 });

    await loggedInApp.productDetailsPage.header.navCart.click();
    await expect(loggedInApp.cartPage.cartProductTitle).toContainText('Combination Pliers');
    await expect(loggedInApp.cartPage.productPrice).toContainText('$14.15');
    await expect(loggedInApp.cartPage.linePrice).toContainText('$14.15');
    await loggedInApp.cartPage.proceedToCheckoutButton.click();

    await expect(loggedInApp.cartPage.alreadyLoggedinMessage).toBeVisible();
    await loggedInApp.cartPage.proceedToCheckoutButton2.click();

    await loggedInApp.cartPage.state.fill('Some State');
    await loggedInApp.cartPage.postcode.fill('11111');
    await loggedInApp.cartPage.proceedToCheckoutButton3.click();

    await loggedInApp.cartPage.selectPaymentMethod('credit-card');
    await loggedInApp.cartPage.fillCreditCardDetails(CreditCardData);
    await loggedInApp.cartPage.confirmButton.click();

    await expect(loggedInApp.cartPage.successMessage).toContainText('Payment was successful');

});