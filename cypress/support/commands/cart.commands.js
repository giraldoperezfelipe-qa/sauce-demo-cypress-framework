Cypress.Commands.add('retrieveProductNamesInCart', (products) => {
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
		.then(() => { //Once finished, return the names list
			return productNamesList
		})
})
