import AuthenticationPage from '../../pages/authenticationPage'

Cypress.Commands.add('logInWithValidCredentials', (customUser, customPass) => {
	const authenticationPage = new AuthenticationPage()

	if (customUser && customPass) {
		authenticationPage.fillLoginFields(customUser, customPass)
		authenticationPage.clickLoginButton()
	} else {
		cy.env(['SAUCE_USER', 'SAUCE_PASS']).then(({ SAUCE_USER, SAUCE_PASS }) => {
			authenticationPage.fillLoginFields(SAUCE_USER, SAUCE_PASS)
			authenticationPage.clickLoginButton()
		})
	}
})

Cypress.Commands.add('logout', () => {
	const authenticationPage = new AuthenticationPage()

	authenticationPage.logout()
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
						: loginCase.password //Otherwise, leave the original value
			}))
	}

	return cy.wrap(loginCase) //Returns as Cypress chainable
})
