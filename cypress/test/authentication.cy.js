/// <reference types="cypress" />

import AuthenticationPage from '../pages/AuthenticationPage'

const invalidLogins = require('../fixtures/invalidCredentialsForLogin.json')

describe('Succesful Login', () => {
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

describe('Unsuccesful Login', () => {
	invalidLogins.forEach((loginCase) => {
		const { caseName, errorDescription } = loginCase //Extract the properties and assign them to standalone constants

		it(`Using ${caseName} must display the error: ${errorDescription}`, () => {
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
