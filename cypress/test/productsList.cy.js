/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage'

describe('Add products to cart', () => {
	it("Add one item to the cart", () => {
		cy.visit('')
		cy.loginWithValidCredentials()
		cy.addNProductsToCart(1)
		cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, 1)
	})

	it("Add two items to the cart", () => {
		cy.visit('')
		cy.loginWithValidCredentials()
		cy.addNProductsToCart(2)
		cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, 2)
	})
})

describe('Cart congruency', () => {
	it("Item in the cart is still there after loging out and login in again", () => {
		cy.visit('')
		cy.loginWithValidCredentials()
		cy.addNProductsToCart(1)
		cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, 1)
		cy.logout()
		cy.loginWithValidCredentials()
		cy.locateElementAndCompareText(ProductsPage.ELEMENTS.cartItemsCounter, 1)
	})

	it("Item added to the cart must not be present for another user's car", () => {

	})
})
