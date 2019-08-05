import { browser } from 'protractor';
import { MainPage} from './main.po';

declare const allure: any;

export class MainNavigationService {
    public static navigateToPatientMaintenancePage(mainPage: MainPage) {
        mainPage.checkPresentAndDisplayed();
        mainPage.getPatientButtton()
            .click();
    }
}
