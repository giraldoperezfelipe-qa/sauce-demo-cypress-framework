import AuthenticationPage from '../pages/AuthenticationPage'
import ProductsPage from '../pages/ProductsPage.js'

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

Cypress.Commands.add('addProductToCart', () => {
    const productsPage = new ProductsPage()

    return productsPage.pickRandomProduct().then($product => {
        cy.wrap($product).find(ProductsPage.ELEMENTS.addToCartButton).click()
        return cy.wrap($product)
    })
})