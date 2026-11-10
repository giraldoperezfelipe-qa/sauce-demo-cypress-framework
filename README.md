⚠️ IN PROGRESS ⚠️

# Sauce demo cypress js framework

This is a small, end-to-end automation testing demo built using JS and Cypress, targeting the demo e-commerce store SauceDemo.

🚀 **Features**

    1. Automated Login Flow: Tests standard users, locked-out users, and performance glitch users.
    2. Shopping Cart Operations: Adds items to the cart, verifies item details, and removes items.
    3. Checkout Process: Fills out checkout information and completes a successful order.

🛠️ **Prerequisites**

Make sure you have the following installed on your machine:
-   Node JS (current project version 24.22.0)
-   Java (current project version 25.0.5)

📦 **Installation & Setup**

    1. Add the variables 'CYPRESS_SAUCE_USER' and 'CYPRESS_SAUCE_PASS' with the corresponding values shown in the home page of sauce demo to your environment (Linux or Windows), before executing the repo. 

    2. Clone the repository:
    git clone <REPO_LINK>
    cd sauce-demo-cypress-framework

🏃‍♂️ **Running the Tests**

    1. To run the demo script or test suite, use the following command:
    npx cypress open

    2. Select the desired spec.
