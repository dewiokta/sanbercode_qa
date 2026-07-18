class recruitmentPage {
    visitRecruitmentPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates')
    }

    buttonAddCandidate() {
        cy.get('button[type="button"]').contains('Add').click()
        cy.url().should('include', '/recruitment/addCandidate')
    }

    addValidFullName(firstName, middleName, lastName) {
        {
            cy.get('input[name="firstName"]').type(firstName)
            cy.get('input[name="middleName"]').type(middleName)
            cy.get('input[name="lastName"]').type(lastName)
        }
    }

    addValidVacancy(vacancy) {
        cy.get('.oxd-select-text-input').click()
        cy.get('div[role="listbox"]').contains(vacancy).click()
    }

    addValidEmail(email) {
        cy.get('input[placeholder="Type here"]').eq(0).type(email)

    }

    addValidPhone(phone) {
        cy.get('input[placeholder="Type here"]').eq(1).type(phone)
    }

    uploadResume(resume) {
        cy.get('.oxd-file-input').selectFile('cypress/fixtures/resume.docx', { force: true });
    }
    addAdditionals(keywords, date, notes, consent) {
        cy.get('input[placeholder="Enter comma seperated words..."]').type(keywords)
        if (date) {
            cy.get('input[placeholder="yyyy-dd-mm"]').should('be.visible').click().clear().type(date);
            cy.get('.oxd-date-input-calendar').contains('Close').click();
        }
        cy.get('textarea[placeholder="Type here"]').type(notes)
        if (consent) {
            cy.get('.oxd-checkbox-input').click()
        }
    }

    saveButton() {
        cy.get('button[type="submit"]').contains('Save').click()
    }

    verifySuccessToast() {
        cy.get('.oxd-toast', { timeout: 8000 }).should('be.visible').and('contain', 'Successfully Saved');
    }

    pageVacancy() {
        cy.get('.oxd-topbar-body-nav-tab-item').contains('Vacancies').should('be.visible').click()


    }

    buttonAddVacancy() {
        cy.get('button[type="button"]').contains('Add').click()
        cy.url().should('include', '/recruitment/addJobVacancy')
    }

    addVacancyName(vacancyName) {
        cy.get('.oxd-input').eq(0).type(vacancyName)

    }

    chooseJobTitle(jobTitle) {
        cy.get('.oxd-select-text-input').click()
        cy.get('div[role="listbox"]').contains(jobTitle).click()
    }

    addDescription(desc) {
        cy.get('textarea[placeholder="Type description here"]').type(desc)
    }

    chooseHiringManager(hiringManager) {
        cy.get('input[placeholder="Type for hints..."]').type(hiringManager, { delay: 100 });
        cy.get('.oxd-autocomplete-dropdown', { timeout: 8000 }).should('be.visible');
        cy.get('.oxd-autocomplete-option').contains(hiringManager).click();
    }

    addNumberOfPositions(num) {
        cy.get('.oxd-input').eq(1).type(num)
    }

    verifyError() {
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
    }

    addInvalidFullName(middleName, lastName) {
        {
            cy.get('input[name="firstName"]').clear()
            cy.get('input[name="middleName"]').type(middleName)
            cy.get('input[name="lastName"]').type(lastName)
        }
    }

    verifyEmail() {
        cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Expected format: admin@example.com');
    }

    searchName(name) {
        cy.get('input[placeholder="Type for hints..."]').eq(0).type(name, { delay: 100 });
        cy.get('.oxd-autocomplete-dropdown', { timeout: 8000 }).should('be.visible');
        cy.get('.oxd-autocomplete-option').contains(name).click();
    }


    verifySearchResultsName(name) {
        cy.get('.oxd-table-card').should('contain', name)
    }

    searchVacancy(vacancy) {
        cy.get('.oxd-select-text-input').click()
        cy.get('div[role="listbox"]').contains(vacancy).click()

    }

    verifySearchResultsVacancy(vacancy) {
        cy.get('.oxd-table-card').should('contain', vacancy)
    }

    buttonSubmit() {
        cy.get('button[type="submit"]').contains('Search').click()
    }

    openCandidate() {
        cy.get('.oxd-table-cell-actions').eq(0).find('.bi-eye-fill, .bi-pencil-fill').click();
    }

    clickShortlistButton() {
        cy.get('button').contains('Shortlist').should('be.visible').click();
    }

    addNotes(notes) {
        cy.get('textarea[placeholder="Type here"]').type(notes);
    }

    verifyCandidateStatus(expectedStatus) {
        cy.get('.oxd-text--subtitle-2').should('be.visible').and('contain', expectedStatus);
    }

    deleteCandidate(){
        cy.get('.oxd-table-cell-actions').eq(0).find('.bi-trash').click();
            cy.get('.oxd-button--label-danger').contains('Yes, Delete').click();
    }

    updateToast(){
        cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Updated');
    }

    

    verifyDelete(){
        cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Deleted');
    }
}

export default new recruitmentPage()