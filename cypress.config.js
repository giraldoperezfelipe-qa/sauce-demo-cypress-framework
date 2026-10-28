const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		specPattern: 'cypress/test/**/*.cy.{js,jsx,ts,tsx}',
		baseUrl: 'https://www.saucedemo.com',
	},
	env: {
		SAUCE_USER: process.env.CYPRESS_SAUCE_USER,
		SAUCE_PASS: process.env.CYPRESS_SAUCE_PASS,
	},
})
