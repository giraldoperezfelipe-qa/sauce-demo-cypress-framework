/// <reference types="cypress" />

import AuthenticationPage from '../pages/AuthenticationPage'

const invalidLogins = require('../fixtures/invalidCredentialsForLogin.json')

describe("Succesful Login scenario", () => {
	it('Test login success with valid credentials', () => {
		const authenticationPage = new AuthenticationPage()
		cy.visit('')

		cy.env(['SAUCE_USER', 'SAUCE_PASS']).then(({ SAUCE_USER, SAUCE_PASS }) => {
			authenticationPage.fillLoginFields(SAUCE_USER, SAUCE_PASS)
			authenticationPage.clickLoginButton()
		})

		cy.locateElementAndCompareText(
			AuthenticationPage.ELEMENTS.title,
			'Products',
		)
	})
})

describe("Unsuccesful Login scenarios", () => {
	invalidLogins.forEach((loginCase) => {
		const { caseName, errorDescription } = loginCase //Extract the properties and assign them to standalone constants

		it(`Attempting to login using ${caseName} must display the error: ${errorDescription}`, () => {
			cy.getInvalidLoginCredential(loginCase).then(({ username, password }) => {
				const authenticationPage = new AuthenticationPage()

				cy.visit('')
				authenticationPage.fillLoginFields(username, password)
				authenticationPage.clickLoginButton()
				cy.locateElementAndCompareText(
					AuthenticationPage.ELEMENTS.errorMessage,
					errorDescription,
				)
			})
		})
	})
})

describe('Unsuccessful actions without login in scenarios', () => {
	it("Unsuccesful attempt to go to the product list", () => {
		cy.visit('/inventory.html', {failOnStatusCode: false})
		//Ignore fail 2xx response code explicitly or this case, so Cypress can go on

		cy.locateElementAndCompareText(
			AuthenticationPage.ELEMENTS.errorMessage,
			"You can only access '/inventory.html' when you are logged in.",
		)
	})

	it("Unsuccesful attempt to go to the cart list", () => {
		cy.visit('/cart.html', {failOnStatusCode: false})

		cy.locateElementAndCompareText(
			AuthenticationPage.ELEMENTS.errorMessage,
			"You can only access '/cart.html' when you are logged in.",
		)
	})

	it("Unsuccesful attempt to go to the first step checkout", () => {
		cy.visit('/checkout-step-one.html', {failOnStatusCode: false})

		cy.locateElementAndCompareText(
			AuthenticationPage.ELEMENTS.errorMessage,
			"You can only access '/checkout-step-one.html' when you are logged in.",
		)
	})

	it("Unsuccesful attempt to go to the second step checkout", () => {
		cy.visit('/checkout-step-two.html', {failOnStatusCode: false})

		cy.locateElementAndCompareText(
			AuthenticationPage.ELEMENTS.errorMessage,
			"You can only access '/checkout-step-two.html' when you are logged in.",
		)
	})

	it("Unsuccesful attempt to go to the checout completed page", () => {
		cy.visit('/checkout-complete.html', {failOnStatusCode: false})

		cy.locateElementAndCompareText(
			AuthenticationPage.ELEMENTS.errorMessage,
			"You can only access '/checkout-complete.html' when you are logged in.",
		)
	})
})

describe('Logout scenario', () => {
	it("Logout from a successful login", () => {
		const authenticationPage = new AuthenticationPage()
		cy.visit('')

		cy.loginWithValidCredentials()

		authenticationPage.logout()
		cy.get(AuthenticationPage.ELEMENTS.usernameInput).should('be.visible')
		cy.get(AuthenticationPage.ELEMENTS.passwordInput).should('be.visible')
	})
})