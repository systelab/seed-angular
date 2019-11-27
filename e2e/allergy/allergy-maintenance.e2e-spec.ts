import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { TestUtil } from '../common/utilities/test-util';
import { NavigationService } from '../common/utilities/navigation.service';


declare const allure: any;

describe('TC0002_AllergyManagement_e2e', () => {
    const loginPage = new LoginPage();
    const mainPage = new MainPage();

    beforeAll(() => {
        NavigationService.navigateToHomePage(loginPage);
        NavigationService.login(loginPage);
        NavigationService.navigateToAllergyMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0002_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy',
            loginPage.appVersion, 'userName');
    });

    it('Access to the allergy screen', () => {
        const tabs = ['Allergies'];
        const titles = ['', 'Name', 'Signs', 'Symptoms']
        const grid = mainPage.getAllergyGrid();

        TestUtil.checkNumber(mainPage.getConfigTabs().getNumberOfTabs(), 'tabs', 1);
        TestUtil.checkText(mainPage.getConfigTabs().getTab(0).getText(), `Tab[0]: ${tabs[0]}`, tabs[0]);
     //   GridService.checkGridHeaders(grid, titles);
    });
});
