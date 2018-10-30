import { LoginPage } from './login.po';
import { MainPage } from '../main/main.po';
import { browser, ExpectedConditions as EC } from 'protractor';
import { TestToolkit } from '../common/utilities/test-toolkit';

declare const allure: any;

describe('Login Test Case: MLG_TC106_GEN_Login', () => {
	let login: LoginPage;
	let mainPage: MainPage;

	beforeEach(() => {
		allure.addLabel('tms', 'MLG_TC106_GEN_Login_e2e');
		allure.addLabel('feature', 'Goal: The purpose of this test case is to verify the login and log out functionalities');
		login = new LoginPage();
		mainPage = new MainPage();

	});

	it('Login correct', () => {
		allure.createStep('Action: Open home page', () => {
			login.navigateToHomePage();
		})();
		allure.createStep(`Action: Set username as ${browser.params.login.user} and password as ${browser.params.login.password}`, () => {
			login.getUsernameField().sendKeys(browser.params.login.user);
			login.getPasswordField().sendKeys(browser.params.login.password);
		})();
		allure.createStep('Action: Perform Login', () => {
			login.getEnterButton().click();
		})();
		allure.createStep('The home page is displayed', () => {
			browser.wait(EC.presenceOf(mainPage.getMainWindow()), TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Main Dialog Window is taking too long to appear in the DOM (timeout: ' + TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
			expect(mainPage.getFullUsernameField().getText()).toEqual('Administrator');
		})();
	});

	it('Login with an incorrect password', () => {
		allure.createStep('Action: Open home page', () => {
			login.navigateToHomePage();
		})();
		allure.createStep('Action: Set username as noUser and password as noPass', () => {
			login.getUsernameField().sendKeys('noUser');
			login.getPasswordField().sendKeys('noPass');
		})();
		allure.createStep('Action: Perform Login', () => {
			login.getEnterButton().click();
		})();
		allure.createStep('The application returns an Invalid User Name and Password error', () => {
			expect(login.getPopupMessage().getText()).toEqual('Invalid username or password');
		})();
	});
})
