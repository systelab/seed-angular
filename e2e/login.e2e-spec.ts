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
		login = new LoginPage();
		main = new MainPage();
	});

	it('Should display an error message if password is not correct', () => {
		allure.addLabel('testId', 'TEST-1');
		allure.addLabel('issue', 'ISSUE-1');
		allure.description('Should display an error message if password is not correct');
		allure.severity(allure.SEVERITY.BLOCKER);
		allure.feature('Login');
		allure.story('Login Story');
		navigateToHomePage();
		setUserNameAndPassword('Systelab', 'wrong password');
		allure.createStep('Click on Enter button', function(){})();
		login.getEnterButton().click();
		allure.createStep('Check that I have an error', function(){})();
		expect(login.getErrorMessage().getText()).toBe('Invalid username or password');
	});

	it('Should enter if password is correct', () => {
		allure.addLabel('testId', 'TEST-2');
		allure.description('Should enter if password is correct');
		allure.severity(allure.SEVERITY.BLOCKER);
		allure.feature('Login');
		allure.story('Login Story');
		navigateToHomePage();
		setUserNameAndPassword('Systelab', 'Systelab');
		allure.createStep('Click on Enter button', function(){})();
		login.getEnterButton().click();
		allure.createStep('Check that I see the main page', function(){})();
		expect(main.getFullUsernameField().getText()).toBe('Administrator');
	});
});
