/// <reference types="cypress" />

import AuthenticationPage from '../pages/AuthenticationPage'

describe('Test login success with valid credentials', () => {
	it('passes', () => {
		const authenticationPage = new AuthenticationPage()
		cy.visit('')

		cy.env(['SAUCE_USER', 'SAUCE_PASS']).then(({ SAUCE_USER, SAUCE_PASS }) => {
			authenticationPage.fillLoginFields(SAUCE_USER, SAUCE_PASS)
			authenticationPage.clickLoginButton()
		})

		cy.get('.title').should('have.text', 'Products')
	})
})

describe('Test login failures with invalid credentials', () => {
	const invalidLogins = [
		{
			username: 'qwerty123',
			password: 'qwerty9685',
			errorDescription: 'Username and password do not match',
			caseName: 'invalid username and password',
		},
		{
			username: '',
			password: '',
			errorDescription: 'Username is required',
			caseName: 'blank username and password',
		},
		{
			username: '',
			password: 'secret_sauce',
			errorDescription: 'Username is required',
			caseName: 'only blank username',
		},
		{
			username: 'standard_user',
			password: '',
			errorDescription: 'Password is required',
			caseName: 'only blank password',
		},
		{
			username: 'locked_out_user',
			password: 'secret_sauce',
			errorDescription: 'this user has been locked out',
			caseName: 'locked username',
		},
	]
	invalidLogins.forEach(
		({ username, password, errorDescription, caseName }) => {
			it(`Using ${caseName} must display the error: ${errorDescription}`, () => {
				const authenticationPage = new AuthenticationPage()
				cy.visit('')
				authenticationPage.fillLoginFields(username, password)
				authenticationPage.clickLoginButton()
				authenticationPage.compareErrorMessage(errorDescription)
			})
		},
	)
})
