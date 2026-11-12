import ProductsPage from '../pages/ProductsPage.js'

Cypress.Commands.add('addNProductsToCart', (numberOfProducts) => {
	const productsPage = new ProductsPage()

	return productsPage.pickRandomNProducts(numberOfProducts).then(($products) => {
			const productArray = Array.from($products)

			productArray.forEach((product) => {
				cy.wrap(product).find(ProductsPage.ELEMENTS.addToCartButton).click()
			})
            
			return cy.wrap($products)
		})
})
