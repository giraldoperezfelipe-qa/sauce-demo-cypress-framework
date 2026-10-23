Cypress.Commands.add('locateElementAndFillField', (locator, text) => {
	cy.get(locator).clear().type(text)
})

Cypress.Commands.add('locateElementAndClickIt', (locator) => {
	cy.get(locator).click()
})
