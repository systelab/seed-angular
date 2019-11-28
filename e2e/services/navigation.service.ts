import { browser, ExpectedConditions as EC } from 'protractor';
import { LoginPage } from '../page-objects/login/login.po';
import { MainPage } from '../page-objects/main/main.po';
import { BasePage } from '../page-objects/base-page';
import { TestUtil } from '../utilities/test-util';
import { ButtonState, FormService } from './form.service';

declare const allure: any;

export class NavigationService {

    public static readonly TIME_OUT_MS_FOR_DIALOG_WINDOW = 30000;

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
        this.checkPresentAndDisplayed(mainPage);
        mainPage.getPatientButton().click();
    }

    public static navigateToAllergyMaintenancePage(mainPage: MainPage) {
        this.checkPresentAndDisplayed(mainPage);
        mainPage.getConfigIcon().click();
    }

    public static waitForVisible(page: BasePage) {
        browser.wait(EC.presenceOf(page.getElementFinder()), NavigationService.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Main Dialog Window is taking too long to appear in the DOM (timeout: ' + NavigationService.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
    }

    public static checkPresentAndDisplayed(page: BasePage) {
        expect(page.getElementFinder()
          .isPresent())
          .toEqual(true, 'Window should be present on the DOM');
        expect(page.getElementFinder()
          .isDisplayed())
          .toEqual(true, 'Window should be displayed');
    }

    public static checkPageTitleAndButtons(page: BasePage, expectedTitle: string, buttons?: ButtonState[]) {
        this.waitForVisible(page);
        this.checkPresentAndDisplayed(page);

        TestUtil.checkText(page.getTitle(), 'Window title', expectedTitle);
        if (buttons) {
            FormService.checkButtons(page, buttons);
        }
    }
}
