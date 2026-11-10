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

	logout() {
		cy.locateElementAndClickIt(AuthenticationPage.ELEMENTS.menuButton)
		cy.locateElementAndClickIt(AuthenticationPage.ELEMENTS.logoutButton)
	}
}

export default AuthenticationPage
