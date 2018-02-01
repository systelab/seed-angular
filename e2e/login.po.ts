import { browser, by, element } from 'protractor';

export class LoginPage {
	navigateToHomePage() {
		return browser.get('/');
	}

	getUsernameField() {
		return element(by.id('inputUserName'));
	}
	getPasswordField() {
		return element(by.id('inputPassword'));
	}
	getEnterButton() {
		return element(by.buttonText('Enter'));
	}

	getErrorMessage() {
		return element(by.id('popup-message'));
	}
}
