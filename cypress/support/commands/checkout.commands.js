import { faker } from '@faker-js/faker'
import { TEXTS } from '../../support/constants'
import ProductsPage from '../../pages/productsPage'
import CheckoutPage from '../../pages/checkoutPage'

Cypress.Commands.add('retrieveProductNamesInCheckout', (products) => {
	const productNamesList = []

	return cy
		.wrap(products)
		.each(($product) => {
			cy.wrap($product)
				.invoke('text')
				.then((text) => {
					productNamesList.push(text.trim())
				})
		})
		.then(() => {
			//Once finished, return the names list
			return productNamesList
		})
})

Cypress.Commands.add(
	'getIncompleteCheckoutFormData',
	(IncompleteCheckoutScenario) => {
		const resolvedData = {
			...IncompleteCheckoutScenario, //Copy all other properties from the original object, so they are not lost
			firstName:
				IncompleteCheckoutScenario.firstName === '{{FIRST_NAME}}'
					? faker.person.firstName() //If the previous comparision matches, asign the firstName random value
					: IncompleteCheckoutScenario.firstName, //Otherwise, leave the original value
			lastName:
				IncompleteCheckoutScenario.lastName === '{{LAST_NAME}}'
					? faker.person.lastName()
					: IncompleteCheckoutScenario.lastName,
			postalCode:
				IncompleteCheckoutScenario.postalCode === '{{POSTAL_CODE}}'
					? faker.location.zipCode() //If the previous comparision matches, asign the zipCode random value
					: IncompleteCheckoutScenario.postalCode
		}

		return cy.wrap(resolvedData)
	}
)

Cypress.Commands.add('completeCheckoutProcess', (numberOfDesiredProducts) => {
	return cy.addNProductsToCart(numberOfDesiredProducts).then((products) => {
		const checkoutPage = new CheckoutPage()
		cy.locateElementAndCompareText(
			ProductsPage.ELEMENTS.cartItemsCounter,
			numberOfDesiredProducts
		)

		return cy.retrieveProductNamesAddedToCart(products).then((addedNames) => {
			cy.locateElementAndClickIt(ProductsPage.ELEMENTS.cartIcon)
			cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.checkoutButton)
			let customerInfo =
				checkoutPage.fillAndReturnCheckoutFormWithRandomValidInformation()
			cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.continueButton)

			return cy.get(CheckoutPage.ELEMENTS.itemName).then((items) => {
				return cy.retrieveProductNamesInCheckout(items).then((cartNames) => {
					expect(cartNames).to.deep.equal(addedNames)
					const checkoutItemsObj = cartNames.reduce((acc, name, index) => {
						acc[`item-${index + 1}`] = name
						return acc
					}, {})

					customerInfo = {
						...customerInfo,
						checkoutItemsObj
					}

					cy.locateElementAndClickIt(CheckoutPage.ELEMENTS.finishButton)
					cy.locateElementAndCompareText(
						CheckoutPage.ELEMENTS.checkoutCompletedTitle,
						TEXTS.CHECKOUT.SUCCESS_TITLE
					)

					return cy.wrap(customerInfo)
				})
			})
		})
	})
})
