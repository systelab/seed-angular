import {LoginPage} from '../page-objects/login.po';
import {LoginActionService} from './login-action.service';

export class LoginNavigationService {

	public static async navigateToHomePage(loginPage: LoginPage) {
		await browser.url('/#/login');
		await LoginActionService.setAppParams(loginPage);
	}
}
