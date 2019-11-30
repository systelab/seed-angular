import { browser } from 'protractor';
import { LoginPage } from '../page-objects/login/login.po';

export class LoginNavigationService {

    public static login(loginPage: LoginPage, useWrongPassword: boolean = false, clickEnter: boolean = true) {
        loginPage.getUsernameField().setText(browser.params.login.user);
        if (!useWrongPassword) {
            loginPage.getPasswordField().setText(browser.params.login.password);
        } else {
            loginPage.getPasswordField().setText('PassProvidedByTesting');
        }
        if (clickEnter) {
            loginPage.getEnterButton().click();
        }
    }

    public static navigateToHomePage(loginPage: LoginPage) {
        browser.get('/#/login');
        loginPage.retrieveAppParams(loginPage);
    }

}
