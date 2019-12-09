import {LoginPage} from '../page-objects/login.po';
import {GeneralParameters} from '../../general-parameters';
import {LoginNavigationService} from './login-navigation.service';

export class LoginActionService {

	public static async login(loginPage: LoginPage) {
		await LoginNavigationService.navigateToHomePage(loginPage);
		await loginPage.getUsernameField().setText(GeneralParameters.USERNAME);
		await loginPage.getPasswordField().setText(GeneralParameters.PASSWORD);
		await loginPage.getEnterButton().click();
	}
}
