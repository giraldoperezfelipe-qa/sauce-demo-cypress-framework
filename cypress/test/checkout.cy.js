/// <reference types="cypress" />

import ProductsPage from '../pages/productsPage'
import CheckoutPage from '../pages/checkoutPage'

const incompleteCheckoutFormData = require('../fixtures/incompleteCheckoutFormData.json')

describe('Full checkout process', () => {
	it('Checkout succesfully the items added to the cart', () => {
		const numberOfDesiredProducts = 2
		cy.visit('')
		cy.logInWithValidCredentials()
		cy.completeCheckoutProcess(numberOfDesiredProducts)
	})

	it('Return to the home page after checkout', () => {
		const numberOfDesiredProducts = 2
		cy.visit('')
		cy.logInWithValidCredentials()
		cy.completeCheckoutProcess(numberOfDesiredProducts)
		cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.backToProductsButton)
		cy.get(ProductsPage.ELEMENTS.inventoryItems).should('be.visible')
	})
})

describe('Checkout form errors', () => {
	incompleteCheckoutFormData.forEach((incompleteCheckoutScenario) => {
		const { caseName, errorDescription } = incompleteCheckoutScenario //Extract the properties and assign them to standalone constants
		it(`Attempting to fill checkout form using ${caseName} must display the ${errorDescription}`, () => {
			const numberOfDesiredProducts = 2
			cy.visit('')
			cy.logInWithValidCredentials()
			cy.addNProductsToCart(numberOfDesiredProducts).then(() => {
				cy.locateElementAndClickIt(ProductsPage.ELEMENTS.cartIcon)
				cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.checkoutButton)
				cy.getIncompleteCheckoutFormData(incompleteCheckoutScenario).then(
					({ firstName, lastName, postalCode }) => {
						const checkoutPage = new CheckoutPage()

						checkoutPage.fillCheckoutForm(firstName, lastName, postalCode)
						cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.continueButton)
						cy.locateElementAndCompareText(
							CheckoutPage.ELEMENTS.errorMessage,
							errorDescription
						)
					}
				)
			})
		})
	})
})
