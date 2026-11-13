import { faker } from '@faker-js/faker'

class CheckoutPage {
	static ELEMENTS = {
		checkoutButton: '#checkout',
        continueButton: '#continue',
        finishButton: '#finish',
		firstNameInput: '#first-name',
		lastNameInput: '#last-name',
		postalCodeInput: '#postal-code',
        checkoutCompletedTitle: '[data-test="complete-header"]',
        itemName: '.inventory_item_name',
	}

	fillCheckoutFormWithRandomValidInformation() {
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.firstNameInput,
			faker.person.firstName(),
		)
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.lastNameInput,
			faker.person.lastName(),
		)
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.postalCodeInput,
			faker.location.zipCode(),
		)
	}
}

export default CheckoutPage
