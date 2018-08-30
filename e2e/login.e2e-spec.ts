import { LoginPage } from './login.po';
import { MainPage } from './main.po';

declare const allure: any;

describe('Seed Angular: Login', () => {
	let login: LoginPage;
	let main: MainPage;

	function navigateToHomePage() {
		allure.createStep('Action: Open home page', () => {
			login.navigateToHomePage();
		})();
	}

	function setUserNameAndPassword(userName: string, password: string) {
		allure.createStep(`Action: Set username as '${userName}' and password as '${password}'`, () => {
			login.getUsernameField()
				.sendKeys(userName);
			login.getPasswordField()
				.sendKeys(password);
		})();
	}

	beforeEach(() => {
		allure.addLabel('tms', 'TC0002_LoginManagement_e2e');
		allure.addLabel('feature', 'Login Test Suite.\n\nGoal:\n Check the login page.\n\nEnvironment: A simple browser\nPreconditions:\nN/A.');
		login = new LoginPage();
		main = new MainPage();
	});

	it('Login with an incorrect password:', () => {
		navigateToHomePage();
		setUserNameAndPassword('Systelab', 'wrong password');
		allure.createStep('Action: Perform Login', () => {
			login.getEnterButton()
				.click();
			allure.createStep('The application returns an Invalid User Name and Password error', () => {
				expect(login.getErrorMessage()
					.getText())
					.toBe('Invalid username or password');
			})();
		})();

	});

	it('Login correct: ', () => {
		navigateToHomePage();
		setUserNameAndPassword('Systelab', 'Systelab');
		allure.createStep('Action: Perform Login', () => {
			login.getEnterButton()
				.click();
			allure.createStep('The home page is displayed', () => {
				expect(main.getFullUsernameField()
					.getText())
					.toBe('Administrator');
			})();
		})();

	});
});
