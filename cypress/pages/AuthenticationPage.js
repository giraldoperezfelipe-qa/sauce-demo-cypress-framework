class AuthenticationPage {
	static ELEMENTS = {
		usernameInput: '#user-name',
		passwordInput: '#password',
		loginButton: '#login-button',
		errorMessage: '.error-message-container.error',
	}

	fillLoginFields(username, password) {
		if (username) {
			cy.locateElementAndFillField(
				AuthenticationPage.ELEMENTS.usernameInput,
				username,
			)
		} else {
			cy.get(AuthenticationPage.ELEMENTS.usernameInput).clear()
		}

		if (password) {
			cy.locateElementAndFillField(
				AuthenticationPage.ELEMENTS.passwordInput,
				password,
			)
		} else {
			cy.get(AuthenticationPage.ELEMENTS.passwordInput).clear()
		}
	}

	clickLoginButton() {
		cy.locateElementAndClickIt(AuthenticationPage.ELEMENTS.loginButton)
	}

	compareErrorMessage(errorDescription) {
		cy.get(AuthenticationPage.ELEMENTS.errorMessage)
			.should('be.visible')
			.and('include.text', errorDescription)
	}
}

export default AuthenticationPage
