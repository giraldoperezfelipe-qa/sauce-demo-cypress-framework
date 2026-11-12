import ProductsPage from '../pages/ProductsPage.js'

Cypress.Commands.add('addProductToCart', () => {
    const productsPage = new ProductsPage()

    return productsPage.pickRandomProduct().then($product => {
        cy.wrap($product).find(ProductsPage.ELEMENTS.addToCartButton).click()
        return cy.wrap($product)
    })
})