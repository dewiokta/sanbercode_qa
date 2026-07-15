class loginPage {

    visitPage(){
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    }
    
    inputUsername(username){
        cy.get('input[name="username"]').type(username)
    }

    inputPassword(password){
        cy.get('input[name="password"]').type(password)
    }

    clickLoginButton(){
        cy.get('button[type="submit"]').click()
    }

    verifyLoginSuccess(){
        cy.url().should('include', '/dashboard')
    }

    passwordShouldBeMasked(){
        cy.get('input[name="password"]').should('have.attr', 'type', 'password')
    }

    invalidLoginShouldShowError(){
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    }

    loginFailed(){
        cy.url().should('include', '/auth/login')
    }

    requiredField(){
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required')
    }

    notIncludeDashboardUrl(){
        cy.url().should('not.include', '/dashboard')
    }

    bypassNotAllowed(){
        cy.url().should('include', '/auth/login')
        cy.get('input[name="username"]').should('be.visible')
    }

    visitDashboard(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    }

    usernameClear(){
        cy.get('input[name="username"]').clear()
    }

    passwordClear(){
        cy.get('input[name="password"]').clear()
    }
    
}

export default new loginPage