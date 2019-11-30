import { browser, ExpectedConditions as EC } from 'protractor';
import { LoginPage } from '../page-objects/login/login.po';
import { MainPage } from '../page-objects/main/main.po';
import { BasePage } from '../page-objects/base-page';
import { TestUtil } from '../utilities/test-util';
import { ButtonState, FormService } from './form.service';
import { SystelabDialogTest } from '../widgets/systelab-dialog-test';
import { PatientMaintenanceDialog } from '../page-objects/main/patient/patient-maintenance';

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

    public static navigateToPatientMaintenancePage(mainPage: MainPage): PatientMaintenanceDialog {
        TestUtil.checkPageIsPresentAndDisplayed(mainPage);
        mainPage.getPatientButton().click();
        return mainPage.getPatientMaintenanceDialog();
    }

    public static navigateToAllergyMaintenancePage(mainPage: MainPage) {
        TestUtil.checkPageIsPresentAndDisplayed(mainPage);
        mainPage.getConfigIcon().click();
    }

    public static waitForPageToBeVisible(page: BasePage) {
        browser.wait(EC.presenceOf(page.getElementFinder()), NavigationService.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Page is taking too long to appear in the DOM (timeout: ' + NavigationService.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
    }
    public static waitForDialogToBeVisible(page: SystelabDialogTest) {
        browser.wait(EC.presenceOf(page.getElement()), NavigationService.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Dialog is taking too long to appear in the DOM (timeout: ' + NavigationService.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
    }

    public static checkPageTitleAndButtons(page: SystelabDialogTest, expectedTitle: string, buttons?: ButtonState[]) {
        this.waitForDialogToBeVisible(page);
        TestUtil.checkIsPresentAndDisplayed(page);

        TestUtil.checkText(page.getTitle(), 'Window title', expectedTitle);
        if (buttons) {
            FormService.checkButtons(page, buttons);
        }
    }
}
