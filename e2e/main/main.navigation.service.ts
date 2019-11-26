import { browser } from 'protractor';
import { MainPage} from './main.po';

declare const allure: any;

export class MainNavigationService {
    public static navigateToPatientMaintenancePage(mainPage: MainPage) {
        mainPage.checkPresentAndDisplayed();
        mainPage.getPatientButton()
            .click();
    }

    public static navigateToAllergyMaintenancePage(mainPage: MainPage) {
        mainPage.checkPresentAndDisplayed();
        mainPage.getConfigIcon()
            .click();
    }
}
