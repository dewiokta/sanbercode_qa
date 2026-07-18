class directoryPage {

    visitDirectory() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    }

    veryfyDirectoryPage() {
        cy.url().should('include', '/directory/viewDirectory');
    }

    inputEmployeeName(employeeName) {
        cy.get('input[placeholder="Type for hints..."]').type(employeeName);
    }

    autoCompletedEmployeeName(employeeName) {
        cy.get('.oxd-autocomplete-dropdown').contains(employeeName).click();
    }

    searchButton() {
        cy.get('button[type="submit"]').click();
    }

    verifyResults(employeeName) {
        cy.get('.orangehrm-directory-card-header').should('contain', employeeName);
    }
    
    dropdwonJobTitle() {
        cy.get('.oxd-select-text-input').eq(0).click();
    }

    dropdwonLocation() {
        cy.get('.oxd-select-text-input').eq(1).click();
    }

    chooseJobTitle(jobTitle) {
        cy.get('div[role="listbox"]').contains(jobTitle).click();
    }

    chooseLocation(location) {  
        cy.get('div[role="listbox"]').contains(location).click();
    }

    verifyJobTitle(jobTitle) {
        cy.get('.orangehrm-directory-card-subtitle').should('contain', jobTitle);
    }

    verifyLocation(location) {
        cy.get('.orangehrm-directory-card-description').should('contain', location);
    }

    invalidEmployeeError() {
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Invalid');
    }

    resetButton() {
        cy.get('button[type="reset"]').click();
    }

    verifyReset() {
        cy.get('.oxd-select-text-input').eq(0).should('have.value', '');
    }

    toastMessage() {
        cy.get('#oxd-toaster_1').should('be.visible');
    }

}

export default new directoryPage();