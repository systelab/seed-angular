import { LoginPage } from './login.po';
import { MainPage } from './main.po';

declare const allure: any;

describe('Seed Angular: Login', () => {
	let login: LoginPage;
	let main: MainPage;

	function navigateToHomePage() {
		allure.createStep('Opening main page', function(){})();
		login.navigateToHomePage();
	}

	function setUserNameAndPassword(userName: string, password: string) {
		allure.createStep(`Set username as '${userName}' and password as '${password}'`, function(){})();
		login.getUsernameField().sendKeys(userName);
		login.getPasswordField().sendKeys(password);
	}

	beforeEach(() => {
		allure.addLabel('tms', 'TC0002_LoginManagement_e2e');
		allure.addLabel('feature', 'Login Test Suite.\n\nGoal:\n Check the login page.\n\nEnvironment: A simple browser\nPreconditions:\nN/A.');
		login = new LoginPage();
		main = new MainPage();
	});

	it('Should display an error message if password is not correct', () => {
		allure.severity(allure.SEVERITY.BLOCKER);
		allure.story('Login');
		navigateToHomePage();
		setUserNameAndPassword('Systelab', 'wrong password');
		allure.createStep('Click on Enter button', function(){})();
		login.getEnterButton().click();
		allure.createStep('Check that I have an error', function(){})();
		expect(login.getErrorMessage().getText()).toBe('Invalid username or password');
	});

	it('Should enter if password is correct', () => {
		allure.description('Should enter if password is correct');
		allure.severity(allure.SEVERITY.BLOCKER);
		allure.story('Login');
		navigateToHomePage();
		setUserNameAndPassword('Systelab', 'Systelab');
		allure.createStep('Click on Enter button', function(){})();
		login.getEnterButton().click();
		allure.createStep('Check that I see the main page', function(){})();
		expect(main.getFullUsernameField().getText()).toBe('Administrator');
	});
});
