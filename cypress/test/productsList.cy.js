/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage'

describe('Add products to cart', () => {
	it('Add one item to the cart', () => {
		cy.visit('')

		cy.loginWithValidCredentials()
        cy.addProductToCart()
		cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, 1)
	})
})