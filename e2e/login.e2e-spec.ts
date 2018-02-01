import { LoginPage } from './login.po';
import { MainPage } from './main.po';

describe('Seed Angular: Login', () => {
	let login: LoginPage;
	let main: MainPage;

	beforeEach(() => {
		login = new LoginPage();
		main = new MainPage();
	});

	it('Should display an error message if password is not correct', () => {
		login.navigateToHomePage();
		login.getUsernameField().sendKeys('quentinada');
		login.getPasswordField().sendKeys('wrong password');
		login.getEnterButton().click();
		expect(login.getErrorMessage().getText()).toBe('Invalid username or password');
	});

	it('Should enter if password is correct', () => {
		login.navigateToHomePage();
		login.getUsernameField().sendKeys('quentinada');
		login.getPasswordField().sendKeys('quentinada');
		login.getEnterButton().click();
		expect(main.getFullUsernameField().getText()).toBe('Administrator');
	});
});
