describe ('Test Scenario Login OrangeHRM', () => {
    it('TC01-Login valid account', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include','/dashboard')  
    })

    it('TC02-Login valid account, password is masked', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('input[name="password"]').should('have.attr', 'type', 'password')
        cy.get('button[type="submit"]').click()
        cy.url().should('include','/dashboard')  
    })

    it('TC03-Login invalid account, wrong username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('master')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
        cy.url().should('include','/auth/login')
    })

    it('TC04-Login invalid account, wrong password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('Admin123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
        cy.url().should('include','/auth/login')
    })

    // Failed Test based on test case before
    it('TC05-Login invalid account, wrong username case-sensitivity (Failed Test)', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
        cy.url().should('include','/auth/login')
    })

    it('TC06-Login invalid account, username is empty', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required')
        cy.url().should('not.include','/dashboard')
    })

    it('TC07-Login invalid account, password is empty', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').clear()
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required')
        cy.url().should('not.include','/dashboard')
    })

    it('TC08-Login invalid account, username and password is empty', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required')
        cy.url().should('not.include','/dashboard')
    })

    it('TC09-Access dashboard without login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        cy.url().should('include','/auth/login')
        cy.get('input[name="username"]').should('be.visible')
    })

    it('TC10-Login invalid account, wrong password case-sensitivity', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('Admin123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
        cy.url().should('include','/auth/login')
    })

    // Failed Test based on test case before
    it('TC11-Login invalid account, wrong username add space after username (Failed Test)', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('Admin ')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
        cy.url().should('include','/auth/login')
    })

    it('TC12-Login invalid account, wrong username and password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[name="username"]').type('usernamesalah')
        cy.get('input[name="password"]').type('passwordsalah')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
        cy.url().should('include','/auth/login')
    })
})