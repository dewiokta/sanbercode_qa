import loginPage from '../../../support/Project_Akhir/Login/loginPage'
import loginData from '../../../fixtures/Project_Akhir/Login/loginData'

describe('Test Scenario Login OrangeHRM', () => {

    it('TC01-Login valid account', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess()
    })

    it('TC02-Login valid account, password is masked', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.passwordShouldBeMasked()
        loginPage.clickLoginButton()
        loginPage.verifyLoginSuccess() 
    })

    it('TC03-Login invalid account, wrong username', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.invalidUser.username)
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()
        loginPage.invalidLoginShouldShowError()
        loginPage.loginFailed()
    })

    it('TC04-Login invalid account, wrong password', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.invalidUser.password)
        loginPage.clickLoginButton()
        loginPage.invalidLoginShouldShowError()
        loginPage.loginFailed()
    })


    it('TC05-Login invalid account, username is empty', () => {
        loginPage.visitPage()
        loginPage.usernameClear
        loginPage.inputPassword(loginData.validUser.password)
        loginPage.clickLoginButton()    
        loginPage.requiredField()
        loginPage.notIncludeDashboardUrl()
    })

    it('TC06-Login invalid account, password is empty', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.passwordClear()
        loginPage.clickLoginButton()
        loginPage.requiredField()
        loginPage.notIncludeDashboardUrl()
    })

    it('TC07-Login invalid account, username and password is empty', () => {
        loginPage.visitPage()
        loginPage.usernameClear()
        loginPage.passwordClear()
        loginPage.clickLoginButton()
        loginPage.requiredField()
        loginPage.notIncludeDashboardUrl()
    })

    it('TC08-Access dashboard without login', () => {
        loginPage.visitDashboard()
        loginPage.bypassNotAllowed()
    })

    it('TC09-Login invalid account, wrong password case-sensitivity', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUser.username)
        loginPage.inputPassword(loginData.CaseSensitiveUser.password)
        loginPage.clickLoginButton()
        loginPage.invalidLoginShouldShowError()
        loginPage.loginFailed()
    })

    it('TC10-Login invalid account, wrong username and password', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.invalidUser.username)
        loginPage.inputPassword(loginData.invalidUser.password)
        loginPage.clickLoginButton()
        loginPage.invalidLoginShouldShowError()
        loginPage.loginFailed()
    })
})