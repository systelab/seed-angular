import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { MainNavigationService } from '../../../services/main/main-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';

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
		TestUtil.checkNumber(mainPage.getConfigTabs().getNumberOfTabs(), 'tabs', 1);
		TestUtil.checkText(mainPage.getConfigTabs().getTab(0).getText(), `Tab[0]: ${tabs[0]}`, tabs[0]);
		expect(mainPage.getAllergyGrid().getGridHeader()).toEqual(titles);
	});
});
