import { Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CreditCardDetails } from '../tests/test.data/credit.cart.details';

export class CartPage extends BasePage {
    readonly cartProductQuantity: Locator = this.page.getByTestId('product-quantity');
    readonly cartProductTitle: Locator = this.page.getByTestId('product-title');
    readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');
    readonly productPrice: Locator = this.page.getByTestId('product-price');
    readonly linePrice: Locator = this.page.getByTestId('line-price');
    readonly alreadyLoggedinMessage: Locator = this.page.locator('aw-wizard-step app-login p');
    readonly proceedToCheckoutButton2: Locator = this.page.getByTestId('proceed-2');
    readonly state: Locator = this.page.getByTestId('state');
    readonly postcode: Locator = this.page.getByTestId('postal_code');
    readonly proceedToCheckoutButton3: Locator = this.page.getByTestId('proceed-3');
    readonly paymentMethod: Locator = this.page.getByTestId('payment-method');
    readonly creditCardNumber:Locator = this.page.getByTestId('credit_card_number');
    readonly expirationDate: Locator = this.page.getByTestId('expiration_date');
    readonly cvv: Locator = this.page.getByTestId('cvv');
    readonly cardHolderName: Locator = this.page.getByTestId('card_holder_name');
    readonly confirmButton: Locator = this.page.getByTestId('finish');
    readonly successMessage: Locator = this.page.getByTestId('payment-success-message');

        async selectPaymentMethod(method: string) {
            await this.paymentMethod.selectOption(method);
        };

        async fillCreditCardDetails(details: CreditCardDetails) {
            await this.creditCardNumber.fill(details.creditCardNumber);
            await this.expirationDate.fill(details.expirationDate);
            await this.cvv.fill(details.cvv);
            await this.cardHolderName.fill(details.cardHolderName);
        }
  }