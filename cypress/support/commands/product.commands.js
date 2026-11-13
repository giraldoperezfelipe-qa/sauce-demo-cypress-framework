import ProductsPage from '../../pages/productsPage.js'

Cypress.Commands.add('addNProductsToCart', (numberOfProducts) => {
	const productsPage = new ProductsPage()

	return productsPage
		.pickRandomNProducts(numberOfProducts)
		.then(($products) => {
			const productArray = Array.from($products) //Turn from JQuery to JS native array

			productArray.forEach((product) => {
				cy.wrap(product).find(ProductsPage.ELEMENTS.addToCartButton).click()
			})

			return cy.wrap(productArray)
		})
})

Cypress.Commands.add('retrieveProductNamesAddedToCart', (products) => {
	const productsArray = Array.from(products) //Turn from JQuery to JS native array
	const productNamesList = []

	return cy
		.wrap(productsArray)
		.each(($product) => {
			cy.wrap($product)
				.find(ProductsPage.ELEMENTS.itemName)
				.invoke('text')
				.then((text) => {
					productNamesList.push(text.trim())
				})
		})
		.then(() => { //Once finished, return the names list
			return productNamesList
		})
})
