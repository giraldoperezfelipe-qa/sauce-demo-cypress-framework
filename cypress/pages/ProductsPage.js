class ProductsPage {
	static ELEMENTS = {
		inventoryItems: '.inventory_item',
		itemName: '.inventory_item_name',
		cartIcon: '.shopping_cart_link',
		cartItemsCounter: '.shopping_cart_badge',
		addToCartButton: '.btn.btn_primary.btn_small.btn_inventory'
	}

	pickRandomNProducts(numberOfProductsToAdd) {
		return cy.get('.inventory_item').then(($items) => {
			const totalItems = $items.length

			if (totalItems < numberOfProductsToAdd) {
				throw new Error(
					'You have requested to add more items to your cart than the currently amount available'
				)
			} else if (numberOfProductsToAdd < 0) {
				throw new Error(
					'Items to add to the cart can only be possitive integers, please check'
				)
			} else {
				const selectedIndices = []

				//Fill the array with N unique products indices
				while (selectedIndices.length < numberOfProductsToAdd) {
					const randomIndex = Math.floor(Math.random() * totalItems)
					if (!selectedIndices.includes(randomIndex)) {
						selectedIndices.push(randomIndex)
					}
				}

				// Map the unique indices to their DOM elements, and wrap them to chain them later
				const randomProducts = selectedIndices.map((index) => $items[index])
				return cy.wrap(randomProducts)
			}
		})
	}
}

export default ProductsPage
