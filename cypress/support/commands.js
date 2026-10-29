Cypress.Commands.add('locateElementAndFillField', (locator, text) => {
	cy.get(locator).clear().type(text)
})

Cypress.Commands.add('locateElementAndClickIt', (locator) => {
	cy.get(locator).click()
})

Cypress.Commands.add('locateElementAndCompareText', (locator, textToCompare) => {
	cy.get(locator).should('be.visible').and('include.text', textToCompare)
})

Cypress.Commands.add('getInvalidLoginCredential', (loginCase) => {
	if (
		loginCase.username === '{{SAUCE_USER}}' ||
		loginCase.password === '{{SAUCE_PASS}}'
	) {
		return cy
			.env(['SAUCE_USER', 'SAUCE_PASS'])
			.then(({ SAUCE_USER, SAUCE_PASS }) => ({
				...loginCase, //Copy all other poperties from the original object, so they are not lost
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
