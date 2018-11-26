import { LoginPage } from './login.po';
import { MainPage } from '../main/main.po';
import { browser, ExpectedConditions as EC } from 'protractor';
import { TestUtil } from '../common/utilities/test-util';
import { BasePage } from '../common/components/base-page';

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

	function setUserNameAndPassword(userName: string, password: string) {
		allure.createStep('Action: Open home page', () => {
			login.navigateToHomePage();
		})();
		allure.createStep(`Action: Set username as ${userName} and password as ${password}`, () => {
			login.getUsernameField()
				.sendKeys(userName);
			login.getPasswordField()
				.sendKeys(password);
		})();
		allure.createStep('Action: Perform Login', () => {
			login.getEnterButton()
				.click();
		})();
	}

	it('Login correct', () => {
		setUserNameAndPassword(browser.params.login.user, browser.params.login.password);
		allure.createStep('The home page is displayed', () => {
			browser.wait(EC.presenceOf(mainPage.getMainWindow()), BasePage.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Main Dialog Window is taking too long to appear in the DOM (timeout: ' + BasePage.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
			TestUtil.checkText(mainPage.getFullUsernameField(), 'Logged user', 'Administrator')
		})();
	});

	it('Login with an incorrect password', () => {
		setUserNameAndPassword('noUser', 'noPass');
		allure.createStep('The application returns an Invalid User Name and Password error', () => {
			TestUtil.checkText(login.getPopupMessage(), 'Logged user', 'Invalid username or password')
		})();
	});
});
