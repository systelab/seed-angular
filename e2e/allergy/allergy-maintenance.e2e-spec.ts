import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { LoginNavigationService } from '../login/login.navigation.service';
import { MainNavigationService } from '../main/main.navigation.service';
import { TestUtil } from '../common/utilities/test-util';
import { TabService } from '../common/components/tab.service';
import { GridService } from '../common/components/grid.service';
import { AllergyDetailPage } from './allergy-detail/allergy-dialog.po';


declare const allure: any;

describe('TC0002_AllergyManagement_e2e', () => {
    const loginPage = new LoginPage();
    const mainPage = new MainPage();

    beforeAll(() => {
        LoginNavigationService.navigateToHomePage(loginPage);
        LoginNavigationService.login(loginPage);
        MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0002_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy',
            loginPage.appVersion, 'userName');
    });

    it('Access to the allergy screen', () => {
        const tabs = ['Allergies'];
        const titles = ['', 'Name', 'Signs', 'Symptoms']
        const grid = mainPage.getAllergyGrid();

        TestUtil.checkCount(TabService.getAllTabs(mainPage.getMainWindow()), 'tabs', 1);
        TestUtil.checkText(TabService.getTab(mainPage.getMainWindow(), 0), `Tab[0]: ${tabs[0]}`, tabs[0]);
        GridService.checkGridHeaders(grid, titles);
    });
});
