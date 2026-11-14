class AuthenticationPage {
	static ELEMENTS = {
		usernameInput: '#user-name',
		passwordInput: '#password',
		loginButton: '#login-button',
		title: '.title',
		menuButton: '#react-burger-menu-btn',
		logoutButton: '#logout_sidebar_link',
		errorMessage: '.error-message-container.error',
	}

	fillLoginFields(username, password) {
		const fields = [
			{ value: username, selector: AuthenticationPage.ELEMENTS.usernameInput },
			{ value: password, selector: AuthenticationPage.ELEMENTS.passwordInput }
		]

		fields.forEach(({ value, selector }) => {
			if (value) {
				cy.locateElementAndFillField(selector, value)
			} else {
				cy.get(selector).clear()
			}
		})
	}

	clickLoginButton() {
		cy.locateElementAndClickIt(AuthenticationPage.ELEMENTS.loginButton)
	}

	logout() {
		cy.locateElementAndClickIt(AuthenticationPage.ELEMENTS.menuButton)
		cy.locateElementAndClickIt(AuthenticationPage.ELEMENTS.logoutButton)
	}
}

export default AuthenticationPage
