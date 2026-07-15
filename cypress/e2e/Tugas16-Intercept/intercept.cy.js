describe('Test Scenario Login OrangeHRM', () => {
    it('TC01-Login valid account-using - intercept login endpoint', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        // to make sure that the request is intercepted before the form is submitted, the POST request to the login endpoint
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginValidate')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.wait('@LoginValidate').then((interception) => {
            expect(interception.response.statusCode).to.eq(302)
        })
    })

    it('TC02-Login valid account - intercept dashboard endpoint ', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        // to make sure that the request is intercepted before the form is submitted, the GET request to the dashboard endpoint
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index').as('dashboard')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.wait('@dashboard').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    })

    it('TC03-Login valid account - intercept action summary endpoint', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')

        // to make sure that the request is intercepted after the form is submitted, one of the GET request to the action summary endpoint
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.wait('@actionSummary').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })

    })

    it('TC04-Login invalid account, wrong username intercept - back to login endpoint', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('master')
        cy.get('input[name="password"]').type('admin123')

        // to make sure that the request is intercepted after the form is submitted, the POST request to the login endpoint 
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('backToLogin')
        cy.get('button[type="submit"]').click()
        cy.wait('@backToLogin').then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 302])
        })
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
        cy.url().should('include', '/auth/login')

    })

    it('TC05-Login valid account - intercept dashboard shortcuts endpoint', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')

        //to make sure that the request is intercepted after the form is submitted, one of the GET request to the dashboard shortcuts endpoint
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('dashboardShortcuts')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.wait('@dashboardShortcuts').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    })

    it('TC06-Login invalid account, username is empty - intercept language asset endpoint', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        // to make sure that the request is intercepted after the form is submitted, one of the GET request to the message endpoint
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messageError')
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.wait('@messageError').then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 302])
        })
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required')
        cy.url().should('not.include', '/dashboard')
    })

    it('TC07-Access dashboard without login - intercept bypass attempt endpoint', () => {
        // to make sure that the request is intercepted without , one of the GET request to the dashboard endpoint
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index').as('bypassAttempt')
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        cy.wait('@bypassAttempt').then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 302])
        })
        cy.url().should('include', '/auth/login')
        cy.get('input[name="username"]').should('be.visible')
    })

    it('TC08-Login valid account - intercept dashboard organization subunit chart', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')

        // to make sure that the request is intercepted after the form is submitted, one of the GET request to the dashboard organization subunit chart endpoint
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('subunit')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.wait('@subunit').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    })

    it('TC09-Login valid account - intercept locations endpoint', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')

        // to make sure that the request is intercepted after the form is submitted, one of the GET request to the dashboard organization subunit chart endpoint
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('locations')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.wait('@locations').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    })

})