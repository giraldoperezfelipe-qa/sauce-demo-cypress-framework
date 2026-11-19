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

	it('Download and check the PDF order', () => {
		const numberOfDesiredProducts = 2
		const path = require('path')
		const filePrefix = 'swag-labs-order-'

		cy.visit('')
		// Fail immediately if the downloads folder is not empty
		cy.task('getDownloadsFolderFiles').should('be.empty')
		cy.logInWithValidCredentials()

		cy.completeCheckoutProcess(numberOfDesiredProducts).then((customerInfo) => {
			cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.downloadOrderPDFButton)

			const downloadsFolder = Cypress.config('downloadsFolder')

			cy.task('findDownloadedOrderPDF', filePrefix)
				.then((fileName) => {
					expect(fileName).to.not.be.null
					const filePath = path.join(downloadsFolder, fileName)

					cy.readFile(filePath).should('exist')

					return cy.task('parseDownloadedPDF', filePath).then((text) => {
						//Compare the checkout info and products, with the downloaded PDF info
						expect(text).to.include(customerInfo.firstName)
						expect(text).to.include(customerInfo.lastName)
						expect(text).to.include(customerInfo.zipCode)

						Object.values(customerInfo.checkoutItemsObj).forEach(
							(productName) => {
								expect(text).to.include(productName)
							}
						)
					})
				})
				.then(() => {
					cy.task('deleteDownloadedOrderPDF', filePrefix)
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
							errorDescription
						)
					}
				)
			})
		})
	})
})
