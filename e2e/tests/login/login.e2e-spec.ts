import { browser} from 'protractor';
import { LoginPage } from '../../page-objects/login/login.po';
import { MainPage } from '../../page-objects/main/main.po';
import { LoginNavigationService } from '../../services/login-navigation.service';
import { TestUtil } from '../../utilities/test-util';
import { Test } from 'tslint';

declare const allure: any;

describe('Login Test Case: MLG_TC106_GEN_Login', () => {
	let login: LoginPage;
	let mainPage: MainPage;

	function loginWithUserNameAndPassword(loginPage: LoginPage, userName: string, password: string) {
		allure.createStep('Action: Open home page', () => {
			LoginNavigationService.navigateToHomePage(loginPage);
		})();
		allure.createStep(`Action: Set username as ${userName} and password as ${password}`, () => {
			loginPage.getUsernameField().setText(userName);
			loginPage.getPasswordField().setText(password);
		})();
		allure.createStep('Action: Perform Login', () => {
			loginPage.getEnterButton().click();
		})();
	}

	beforeEach(() => {
		TestUtil.init('MLG_TC106_GEN_Login_e2e', 'Goal: The purpose of this test case is to verify the login and log out functionalities',
			undefined, 'userName');
		login = new LoginPage();
		mainPage = new MainPage();
	});

	it('Login correct', () => {
		loginWithUserNameAndPassword(login, browser.params.login.user, browser.params.login.password);
		allure.createStep('The home page is displayed', () => {
			TestUtil.checkPageIsPresentAndDisplayed(mainPage);
			TestUtil.checkText(mainPage.getFullUsernameField().getText(), 'Logged user', 'Administrator')
		})();
	});

	it('Login with an incorrect password', () => {
		loginWithUserNameAndPassword(login, 'noUser', 'noPass');
		allure.createStep('The application returns an Invalid User Name and Password error', () => {
			TestUtil.checkText(login.getPopupMessage().getText(), 'Logged user', 'Invalid username or password')
		})();
	});
});
