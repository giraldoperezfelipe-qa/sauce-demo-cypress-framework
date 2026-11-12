import AuthenticationPage from '../pages/AuthenticationPage'

Cypress.Commands.add('loginWithValidCredentials', () => {
	const authenticationPage = new AuthenticationPage()

	cy.env(['SAUCE_USER', 'SAUCE_PASS']).then(({ SAUCE_USER, SAUCE_PASS }) => {
		authenticationPage.fillLoginFields(SAUCE_USER, SAUCE_PASS)
		authenticationPage.clickLoginButton()
	})
})

Cypress.Commands.add('getInvalidLoginCredential', (loginCase) => {
	if (
		loginCase.username === '{{SAUCE_USER}}' ||
		loginCase.password === '{{SAUCE_PASS}}'
	) {
		return cy
			.env(['SAUCE_USER', 'SAUCE_PASS'])
			.then(({ SAUCE_USER, SAUCE_PASS }) => ({
				...loginCase, //Copy all other properties from the original object, so they are not lost
				username:
					loginCase.username === '{{SAUCE_USER}}'
						? SAUCE_USER //If the previous comparision matches, asign the SAUCE_USER value
						: loginCase.username, //Otherwise, leave the original value
				password:
					loginCase.password === '{{SAUCE_PASS}}'
						? SAUCE_PASS //If the previous comparision matches, asign the SAUCE_PASS value
						: loginCase.password, //Otherwise, leave the original value
			}))
	}

	return cy.wrap(loginCase) //When 'if' block is not met: This ensure that 'loginCase' returns as Cypress chainable
})