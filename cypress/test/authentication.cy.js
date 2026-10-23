/// <reference types="cypress" />

describe('Test login success with valid credentials', () => {
	it('passes', () => {
		cy.visit('https://www.saucedemo.com')
		cy.get('#user-name').type('standard_user')
		cy.get('#password').type('secret_sauce')
		cy.get('#login-button').click()
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
	invalidLogins.forEach(({ username, password, errorDescription, caseName }) => {
		it(`Using ${caseName} must display the error: ${errorDescription}`, () => {
			cy.visit('https://www.saucedemo.com')
			if (username) {
				cy.get('#user-name').type(username)
			} else {
				cy.get('#user-name').clear()
			}

			if (password) {
				cy.get('#password').type(password)
			} else {
				cy.get('#password').clear()
			}

			cy.get('#login-button').click()

			cy.get('.error-message-container.error')
				.should('be.visible')
				.and('include.text', errorDescription)
		})
	})
})
