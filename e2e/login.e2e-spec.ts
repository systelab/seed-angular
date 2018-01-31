import { LoginPage } from './login.po';
import { MainPage } from './main.po';

describe('Seed Angular', () => {
	let login: LoginPage;
	let main: MainPage;

	beforeEach(() => {
		login = new LoginPage();
		main = new MainPage();
	});

	it('should display an error message if password is not correct', () => {
		login.navigateTo();
		login.getUsernameField().sendKeys('quentinada');
		login.getPasswordField().sendKeys('wrong password');
		login.getEnterButton().click();
		expect(login.getErrorMessage()).toBe('Invalid username or password');
	});

	it('should enter if password is correct', () => {
		login.navigateTo();
		login.getUsernameField().sendKeys('quentinada');
		login.getPasswordField().sendKeys('quentinada');
		login.getEnterButton().click();
		expect(main.getFullUsernameField()).toBe('Administrator');
	});
});
