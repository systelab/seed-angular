import { browser } from 'protractor';
import { LoginPage } from '../page-objects/login.po';
import { GeneralParameters } from '../../general-parameters';

declare const allure: any;

export class LoginNavigationService {

    public static async navigateToHomePage(loginPage: LoginPage) {
        await browser.get('/#/login');
        await loginPage.retrieveAppParams(loginPage);
    }

    public static async login(loginPage: LoginPage, useWrongPassword: boolean = false, clickEnter: boolean = true) {
        await this.navigateToHomePage(loginPage);
        await loginPage.getUsernameField().setText(GeneralParameters.USERNAME);
        if (!useWrongPassword) {
            await loginPage.getPasswordField().setText(GeneralParameters.PASSWORD);
        } else {
            await loginPage.getPasswordField().setText('PassProvidedByTesting');
        }
        if (clickEnter) {
            await loginPage.getEnterButton().click();
        }
    }

    public static async loginWithUserNameAndPassword(loginPage: LoginPage, userName: string, password: string) {
        await allure.createStep('Action: Open home page', async () => {
            await this.navigateToHomePage(loginPage);
        })();
        await allure.createStep(`Action: Set username as ${userName} and password as ${password}`, async () => {
            await loginPage.getUsernameField().setText(userName);
            await loginPage.getPasswordField().setText(password);
        })();
        await allure.createStep('Action: Perform Login', async () => {
            await loginPage.getEnterButton().click();
        })();
    }
}
