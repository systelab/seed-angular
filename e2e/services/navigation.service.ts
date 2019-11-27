import { browser } from 'protractor';
import { LoginPage } from '../page-objects/login/login.po';
import { MainPage } from '../page-objects/main/main.po';

declare const allure: any;

export class NavigationService {
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

    public static navigateToPatientMaintenancePage(mainPage: MainPage) {
        mainPage.checkPresentAndDisplayed();
        mainPage.getPatientButton().click();
    }

    public static navigateToAllergyMaintenancePage(mainPage: MainPage) {
        mainPage.checkPresentAndDisplayed();
        mainPage.getConfigIcon().click();
    }
}
