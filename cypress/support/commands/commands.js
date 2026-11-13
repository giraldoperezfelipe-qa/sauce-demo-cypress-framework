import './authentication.commands.js'
import './product.commands.js'
import './cart.commands.js'
import './checkout.commands.js'

Cypress.Commands.add('locateElementAndFillField', (locator, text) => {
	cy.get(locator).clear().type(text)
})

Cypress.Commands.add('locateElementAndClickIt', (locator) => {
	cy.get(locator).click()
})

Cypress.Commands.add('retrieveElementText', (locator) => {
	cy.get(locator).invoke('text')
})

Cypress.Commands.add(
	'locateElementAndCompareText',
	(locator, textToCompare) => {
		cy.get(locator).should('be.visible').and('include.text', textToCompare)
	},
)