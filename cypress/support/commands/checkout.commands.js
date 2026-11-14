import { faker } from '@faker-js/faker'

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

Cypress.Commands.add('getIncompleteCheckoutFormData', (IncompleteCheckoutScenario) => {
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
