import { browser} from 'protractor';
import { LoginPage } from '../../page-objects/login/login.po';
import { MainPage } from '../../page-objects/main/main.po';
import { LoginNavigationService } from '../../services/login/login-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';

declare const allure: any;

describe('Login Test Case: MLG_TC106_GEN_Login', () => {
	let login: LoginPage;
	let mainPage: MainPage;

	beforeEach(() => {
		TestUtil.init('MLG_TC106_GEN_Login_e2e', 'Goal: The purpose of this test case is to verify the login and log out functionalities',
			undefined, 'userName');
		login = new LoginPage();
		mainPage = new MainPage();
	});

	it('Login correct', async () => {
		await LoginNavigationService.loginWithUserNameAndPassword(login, browser.params.login.user, browser.params.login.password);
		await allure.createStep('The home page is displayed', async () => {
			await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
			await TestUtil.checkText(mainPage.getFullUsernameField().getText(), 'Logged user', 'Administrator')
		})();
	});

	it('Login with an incorrect password', async () => {
		await LoginNavigationService.loginWithUserNameAndPassword(login, 'noUser', 'noPass');
		await allure.createStep('The application returns an Invalid User Name and Password error', async () => {
			await TestUtil.checkText(login.getPopupMessage().getText(), 'Logged user', 'Invalid username or password')
		})();
	});
});
