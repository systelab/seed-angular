import {LoginPage} from '../page-objects/login.po';
import {MainPage} from '../../main/page-objects/main.po';
import {Check, TestUtil} from 'systelab-components-test/lib/utilities';
import {GeneralParameters} from '../../general-parameters';
import {LoginNavigationService} from '../services/login-navigation.service';

declare const allure: any;

describe('TC0002_LoginManagement_e2e', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;

	beforeEach(async () => {
		TestUtil.init('TC0002_LoginManagement_e2e', 'Goal: The purpose of this test case is to verify the login and log out functionalities',
			undefined, 'userName');
		loginPage = new LoginPage();
		mainPage = new MainPage();
		await allure.createStep('Action: Open home page', async () => {
			await LoginNavigationService.navigateToHomePage(loginPage);
		})();
	});

	it('Login correct', async () => {
		await allure.createStep(`Action: Set a valid username and password`, async () => {
			await loginPage.set(GeneralParameters.USERNAME, GeneralParameters.PASSWORD);
			await loginPage.getEnterButton().click();
		})();
		await allure.createStep('The home page is displayed', async () => {
			await mainPage.waitToBePresent();
			await Check.checkText(mainPage.getFullUsernameField().getText(), 'Logged user', 'Administrator');
		})();
	});

	it('Login with an incorrect password', async () => {
		await allure.createStep(`Action: Set an unvalid username and password`, async () => {
			await loginPage.set('noUser', 'noPass');
			await loginPage.getEnterButton().click();
		})();
		await allure.createStep('The application returns an Invalid User Name and Password error', async () => {
			await Check.checkText(loginPage.getMesssagePopup().getTextMessage(), 'Logged user', 'Invalid username or password');
		})();
	});
});
