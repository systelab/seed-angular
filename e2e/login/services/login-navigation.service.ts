import {browser} from 'protractor';
import {LoginPage} from '../page-objects/login.po';

export class LoginNavigationService {

	public static async navigateToHomePage(loginPage: LoginPage) {
		await browser.get('/#/login');
		await loginPage.retrieveAppParams();
	}
}
