import { browser } from 'protractor';
import { LoginPage } from './login.po';

declare const allure: any;

export class LoginNavigationService {
    public static login(loginPage: LoginPage, useWrongPassword: boolean = false, clickEnter: boolean = true) {
        loginPage.getUsernameField()
            .sendKeys(browser.params.login.user);
        if (!useWrongPassword) {
            loginPage.getPasswordField()
                .sendKeys(browser.params.login.password);
        } else {
            loginPage.getPasswordField()
                .sendKeys('PassProvidedByTesting');
        }
        if (clickEnter === true) {
            loginPage.getEnterButton()
                .click();
        }
    }

    public static setUserNameAndPassword(loginPage: LoginPage, userName: string, password: string) {
        allure.createStep('Action: Open home page', () => {
            LoginNavigationService.navigateToHomePage(loginPage);
        })();
        allure.createStep(`Action: Set username as ${userName} and password as ${password}`, () => {
            loginPage.getUsernameField()
                .sendKeys(userName);
            loginPage.getPasswordField()
                .sendKeys(password);
        })();
        allure.createStep('Action: Perform Login', () => {
            loginPage.getEnterButton()
                .click();
        })();
    }

    public static navigateToHomePage(loginPage: LoginPage) {
        browser.get('/#/login');
        loginPage.retrieveAppParams(loginPage);
    }
}