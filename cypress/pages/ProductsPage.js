class ProductsPage {
	static ELEMENTS = {
		inventoryItems: '.inventory_item',
		itemName: '.inventory_item_name',
		cartIcon: '.shopping_cart_link',
		cartItemsCounter: '.shopping_cart_badge',
		addToCartButton: '.btn.btn_primary.btn_small.btn_inventory',
	}

	pickRandomProduct() {
		cy.get('.inventory_item').first().should('be.visible')

		return cy.get('.inventory_item').then(($items) => {
			const randomIndex = Math.floor(Math.random() * $items.length)

			const pickRandomProduct = $items[randomIndex]

			//Wrap it back in Cypress, to chain further commands
			return cy.wrap(pickRandomProduct)
		})
	}

    getProductName(product) {
        return cy.get(product).invoke('text')
    }
}

export default ProductsPage