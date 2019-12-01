import { browser } from 'protractor';
import { LoginPage } from '../../page-objects/login/login.po';

declare const allure: any;

export class LoginNavigationService {

    public static navigateToHomePage(loginPage: LoginPage) {
        browser.get('/#/login');
        loginPage.retrieveAppParams(loginPage);
    }

    public static login(loginPage: LoginPage, useWrongPassword: boolean = false, clickEnter: boolean = true) {
        this.navigateToHomePage(loginPage);
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

    public static loginWithUserNameAndPassword(loginPage: LoginPage, userName: string, password: string) {
        allure.createStep('Action: Open home page', () => {
            this.navigateToHomePage(loginPage);
        })();
        allure.createStep(`Action: Set username as ${userName} and password as ${password}`, () => {
            loginPage.getUsernameField().setText(userName);
            loginPage.getPasswordField().setText(password);
        })();
        allure.createStep('Action: Perform Login', () => {
            loginPage.getEnterButton().click();
        })();
    }
}
