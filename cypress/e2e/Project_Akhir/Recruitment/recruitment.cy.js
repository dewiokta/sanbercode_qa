import loginPage from "../../../support/Project_Akhir/Login/loginPage"
import loginData from "../../../fixtures/Project_Akhir/Login/loginData"
import recruitmentPage from '../../../support/Project_Akhir/Recruitment/recruitmentPage'
import recruitmentData from '../../../fixtures/Project_Akhir/Recruitment/recruitmentData'

describe('Test Scenario Recruitment OrangeRHM', () => {

     it('TC001-Add new Vacancy with valid data', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.pageVacancy()
        recruitmentPage.buttonAddVacancy()
        recruitmentPage.addVacancyName(recruitmentData.validVacancy.vacancyName)
        recruitmentPage.chooseJobTitle(recruitmentData.validVacancy.jobTitle)
        recruitmentPage.addDescription(recruitmentData.validVacancy.description)
        recruitmentPage.chooseHiringManager(recruitmentData.validVacancy.hiringManager)
        recruitmentPage.addNumberOfPositions(recruitmentData.validVacancy.numberOfPositions)    
        recruitmentPage.saveButton()
    })
    
    it('TC002-Add new Candidate with valid data', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.buttonAddCandidate()
        recruitmentPage.addValidFullName(recruitmentData.validCandidate.firstName, recruitmentData.validCandidate.middleName, recruitmentData.validCandidate.lastName)
        recruitmentPage.addValidVacancy(recruitmentData.validCandidate.vacancy)
        recruitmentPage.addValidEmail(recruitmentData.validCandidate.email)
        recruitmentPage.addValidPhone(recruitmentData.validCandidate.phone)
        recruitmentPage.uploadResume(recruitmentData.validCandidate.resume)
        recruitmentPage.addAdditionals(recruitmentData.validCandidate.keywords, recruitmentData.validCandidate.dateOfApplication, recruitmentData.validCandidate.notes, recruitmentData.validCandidate.consent)
        recruitmentPage.saveButton()
        recruitmentPage.verifySuccessToast()
    })


    it('TC003-Add new Candidate with empty first name', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.buttonAddCandidate()
        recruitmentPage.addInvalidFullName(recruitmentData.InvalidCandidate.middleName, recruitmentData.InvalidCandidate.lastName)
        recruitmentPage.addValidVacancy(recruitmentData.validCandidate.vacancy)
        recruitmentPage.addValidEmail(recruitmentData.validCandidate.email)
        recruitmentPage.addValidPhone(recruitmentData.validCandidate.phone)
        recruitmentPage.uploadResume(recruitmentData.validCandidate.resume)
        recruitmentPage.addAdditionals(recruitmentData.validCandidate.keywords, recruitmentData.validCandidate.dateOfApplication, recruitmentData.validCandidate.notes, recruitmentData.validCandidate.consent)
        recruitmentPage.saveButton()
        recruitmentPage.verifyError()
    })

    it('TC004-Add new candidate with wrong email format', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.buttonAddCandidate()
        recruitmentPage.addValidFullName(recruitmentData.validCandidate.firstName, recruitmentData.validCandidate.middleName, recruitmentData.validCandidate.lastName)
        recruitmentPage.addValidVacancy(recruitmentData.validCandidate.vacancy)
        recruitmentPage.addValidEmail(recruitmentData.InvalidCandidate.email)
        recruitmentPage.verifyEmail()
       
    })

    it('TC005-Search Candidate by Candidate Name', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.searchName(recruitmentData.Search.hint)
        recruitmentPage.buttonSubmit()
        recruitmentPage.verifySearchResultsName(recruitmentData.Search.name)
       
    })

    it('TC006-Search Candidate by Vacancy', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.searchVacancy(recruitmentData.Search.vacancy)
        recruitmentPage.verifySearchResultsVacancy(recruitmentData.Search.vacancy)
       
    })


    it('TC007-Change Candidate Status from Application Initiated to Shortlisted', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.searchName(recruitmentData.Search.hint)
        recruitmentPage.buttonSubmit()
        recruitmentPage.verifySearchResultsName(recruitmentData.Search.name)
        recruitmentPage.openCandidate()
        recruitmentPage.clickShortlistButton()
        recruitmentPage.addNotes(recruitmentData.statusChange.notes)
        recruitmentPage.saveButton()
        recruitmentPage.updateToast()
        recruitmentPage.verifyCandidateStatus(recruitmentData.statusChange.status)
       
    })

    it('TC008-Delete Candidate', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
        recruitmentPage.visitRecruitmentPage()
        recruitmentPage.searchName(recruitmentData.Search.hint)
        recruitmentPage.buttonSubmit()
        recruitmentPage.verifySearchResultsName(recruitmentData.Search.name)
        recruitmentPage.deleteCandidate()
        recruitmentPage.verifyDelete()
    })
})