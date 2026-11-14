/// <reference types="cypress" />

import ProductsPage from '../pages/productsPage'
import CheckoutPage from '../pages/checkoutPage'
import { TEXTS } from '../support/constants'

const incompleteCheckoutFormData = require('../fixtures/incompleteCheckoutFormData.json')

describe('Full checkout process', () => {
	it('Checkout succesfully the items added to the cart', () => {
		const numberOfDesiredProducts = 2
		cy.visit('')
		cy.logInWithValidCredentials()

		cy.addNProductsToCart(numberOfDesiredProducts).then((products) => {
			const checkoutPage = new CheckoutPage()
			cy.locateElementAndCompareText(
				ProductsPage.ELEMENTS.cartItemsCounter,
				numberOfDesiredProducts,
			)
			cy.retrieveProductNamesAddedToCart(products).then((addedNames) => {
				cy.locateElementAndClickIt(ProductsPage.ELEMENTS.cartIcon)
				cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.checkoutButton)
				checkoutPage.fillCheckoutFormWithRandomValidInformation()
				cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.continueButton)
				cy.get(CheckoutPage.ELEMENTS.itemName).then((items) => {
					cy.retrieveProductNamesInCheckout(items).then((cartNames) => {
						expect(cartNames).to.deep.equal(addedNames)
					})
				})
				cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.finishButton)
				cy.locateElementAndCompareText(
					CheckoutPage.ELEMENTS.checkoutCompletedTitle,
					TEXTS.CHECKOUT.SUCCESS_TITLE,
				)
			})
		})
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
							errorDescription,
						)
					}
				)
			})
		})
	})
})
