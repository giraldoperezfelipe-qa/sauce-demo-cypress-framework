const { defineConfig } = require('cypress')
const fs = require('fs') //Node's file system module
const path = require('path') //Node's path utility library
const { PDFParse } = require('pdf-parse') //Node module for parsing PDFs

module.exports = defineConfig({
	e2e: {
		specPattern: 'cypress/test/**/*.cy.{js,jsx,ts,tsx}',
		baseUrl: 'https://www.saucedemo.com',
		setupNodeEvents(on, config) {
			on('task', {
				getDownloadsFolderFiles() {
					const downloadsFolder = config.downloadsFolder
                    //Verify that downloads directory exists
					if (fs.existsSync(downloadsFolder)) {
                        //Reads all file names present in the downloads directory
						return fs
							.readdirSync(downloadsFolder)
							.filter((file) => !file.startsWith('.'))
					}
					return []
				},
				async findDownloadedOrderPDF(prefix) {
					const downloadsFolder = config.downloadsFolder
					const timeout = 10000 //Wait max 10 seconds
					const interval = 1000 //Check every second for the file
					let elapsed = 0

					//Cycle for retrying each second
					while (elapsed < timeout) {
						if (fs.existsSync(downloadsFolder)) {
							const files = fs.readdirSync(downloadsFolder)
							//Find complete file, leave out incomplete extension files
							const matchedFile = files.find(
								(file) =>
									file.startsWith(prefix) &&
									!file.endsWith('.crdownload') &&
									!file.endsWith('.tmp') &&
									!file.endsWith('.part')
							)
							if (matchedFile) {
								return matchedFile
							}
						}
						//Pause the loop before the next check if the file hasn't appeared yet, to prevent CPU overload
						await new Promise((resolve) => setTimeout(resolve, interval))
						elapsed += interval
					}
					return null
				},
				async parseDownloadedPDF(filePath) {
					//Read the PDF into memory, as a raw binary buffer
					const buffer = fs.readFileSync(filePath)
					//Instantiate the PDF parse, using the previous binary buffer data
					const parser = new PDFParse({ data: buffer })
					//Wait to extract all readable strings from the parsed PDF
					const result = await parser.getText()
					return result.text
				},
				deleteDownloadedOrderPDF(prefix) {
					const downloadsFolder = config.downloadsFolder

					if (fs.existsSync(downloadsFolder)) {
						const files = fs.readdirSync(downloadsFolder)
						files.forEach((file) => {
							if (file.startsWith(prefix)) {
								const filePath = path.join(downloadsFolder, file)
								try {
									fs.unlinkSync(filePath) //Delete the matched file
								} catch (err) {
									console.error(`Could not delete file ${filePath}:`, err)
								}
							}
						})
					}
					return null
				}
			})
		}
	},
	env: {
		SAUCE_USER: process.env.CYPRESS_SAUCE_USER,
		SAUCE_PASS: process.env.CYPRESS_SAUCE_PASS
	}
})
