/// <reference types="cypress" />

import ProductsPage from '../pages/productsPage'
import CheckoutPage from '../pages/checkoutPage'
import { TEXTS } from '../support/constants'

describe('Checkout process', () => {
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
