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
		errorMessage: '.error-message-container.error',
	}

	fillCheckoutFormWithRandomValidInformation() {
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.firstNameInput,
			faker.person.firstName()
		)
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.lastNameInput,
			faker.person.lastName()
		)
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.postalCodeInput,
			faker.location.zipCode()
		)
	}

	fillCheckoutForm(firstName, lastName, postalCode) {
		const fields = [
			{ value: firstName, selector: CheckoutPage.ELEMENTS.firstNameInput },
			{ value: lastName, selector: CheckoutPage.ELEMENTS.lastNameInput },
			{ value: postalCode, selector: CheckoutPage.ELEMENTS.postalCodeInput },
		]

		fields.forEach(({ value, selector }) => {
			if (value) {
				cy.locateElementAndFillField(selector, value)
			} else {
				cy.get(selector).clear()
			}
		})
	}
}

export default CheckoutPage
