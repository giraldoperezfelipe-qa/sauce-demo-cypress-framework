import { faker } from '@faker-js/faker'

class CheckoutPage {
	static ELEMENTS = {
		checkoutButton: '#checkout',
		continueButton: '#continue',
		finishButton: '#finish',
		backToProductsButton: '#back-to-products',
		downloadOrderPDFButton: '#generate-pdf-order',
		firstNameInput: '#first-name',
		lastNameInput: '#last-name',
		postalCodeInput: '#postal-code',
		checkoutCompletedTitle: '[data-test="complete-header"]',
		itemName: '.inventory_item_name',
		errorMessage: '.error-message-container.error'
	}

	fillAndReturnCheckoutFormWithRandomValidInformation() {
		const customerInfo = {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			zipCode: faker.location.zipCode()
		}

		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.firstNameInput,
			customerInfo.firstName
		)
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.lastNameInput,
			customerInfo.lastName
		)
		cy.locateElementAndFillField(
			CheckoutPage.ELEMENTS.postalCodeInput,
			customerInfo.zipCode
		)

		return customerInfo
	}

	fillCheckoutForm(firstName, lastName, postalCode) {
		const fields = [
			{ value: firstName, selector: CheckoutPage.ELEMENTS.firstNameInput },
			{ value: lastName, selector: CheckoutPage.ELEMENTS.lastNameInput },
			{ value: postalCode, selector: CheckoutPage.ELEMENTS.postalCodeInput }
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
