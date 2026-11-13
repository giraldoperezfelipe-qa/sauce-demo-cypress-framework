/// <reference types="cypress" />

import ProductsPage from '../pages/productsPage'
import CartPage from '../pages/cartPage'

describe('Products added to cart', () => {
	it('Added products match with the ones present in the cart', () => {
		const numberOfDesiredProducts = 2
		cy.visit('')
		cy.logInWithValidCredentials()

		cy.addNProductsToCart(numberOfDesiredProducts).then((products) => {
			cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, numberOfDesiredProducts)

			cy.retrieveProductNamesAddedToCart(products).then((addedNames) => {
				cy.locateElementAndClickIt(ProductsPage.ELEMENTS.cartIcon)

				cy.get(CartPage.ELEMENTS.itemName).then((items) => {
					cy.retrieveProductNamesInCart(items).then((cartNames) => {
						expect(cartNames).to.deep.equal(addedNames)
					})
				})
			})
		})
	})
})
