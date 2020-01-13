import {LoginPage} from '../page-objects/login.po';
import {GeneralParameters} from '../../general-parameters';
import {LoginNavigationService} from './login-navigation.service';

export class LoginActionService {

	public static async login(loginPage: LoginPage, userName: string = GeneralParameters.USERNAME, password: string = GeneralParameters.PASSWORD) {
		await LoginNavigationService.navigateToHomePage(loginPage);
		await loginPage.getUsernameField().setText(userName);
		await loginPage.getPasswordField().setText(password);
		await loginPage.getEnterButton().click();
	}

	public static async setAppParams(loginPage: LoginPage) {
		GeneralParameters.appName = await loginPage.getAppNameLabel().getText();
		GeneralParameters.appDescription = await loginPage.getAppDescriptionLabel().getText();
		GeneralParameters.appVersion = await loginPage.getAppVersionLabel().getText();
		GeneralParameters.appCopyright = await loginPage.getAppCopyrightLabel().getText();
	}
}
