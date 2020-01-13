import {LoginPage} from '../page-objects/login.po';
import {MainPage} from '../../main/page-objects/main.po';
import {because, TestUtil} from 'systelab-components-test/lib/utilities';
import {GeneralParameters} from '../../general-parameters';
import {LoginNavigationService} from '../services/login-navigation.service';

declare const allure: any;

describe('TC0002_LoginManagement_e2e', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	const loginUser = {
		user: GeneralParameters.USERNAME,
		password: GeneralParameters.PASSWORD
	};
	const wrongUser = {
		user: 'noUser',
		password: 'noPass'
	};

	beforeEach(async () => {
		TestUtil.init('TC0002_LoginManagement_e2e', 'Goal: The purpose of this test case is to verify the login and log out functionalities',
			GeneralParameters.appVersion, GeneralParameters.USERNAME);
		loginPage = new LoginPage();
		mainPage = new MainPage();
		await allure.createStep('Action: Open home page', async () => {
			await LoginNavigationService.navigateToHomePage(loginPage);
		})();
	});

	it('Login correct', async () => {
		await allure.createStep(`Action: Set a valid username and password`, async () => {
			await loginPage.set(loginUser.user, loginUser.password);
			await loginPage.getEnterButton().click();
		})();
		await allure.createStep('The home page is displayed', async () => {
			await mainPage.waitToBePresent();
			await because('The logged user is Administrator').expect(await mainPage.getFullUsernameField().getText()).toEqual('Administrator');
		})();
	});

	it('Login with an incorrect password', async () => {
		await allure.createStep(`Action: Set an invalid username and password`, async () => {
			await loginPage.set(wrongUser.user, wrongUser.password);
			await loginPage.getEnterButton().click();
		})();
		await because('Invalid username or password message is displayed').expect(await loginPage.getMesssagePopup().getTextMessage()).toEqual('Invalid username or password');
	});
});
