/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage'

describe('Add products to cart', () => {
	it('Add one item to the cart', () => {
		cy.visit('')

		cy.loginWithValidCredentials()
        cy.addNProductsToCart(1)
		cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, 1)
	})

	it('Add two items to the cart', () => {
		cy.visit('')

		cy.loginWithValidCredentials()
        cy.addNProductsToCart(2)
		cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, 2)
	})
})