import { browser, by, element } from 'protractor';

export class LoginPage {
	navigateTo() {
		return browser.get('/');
	}

	getUsernameField() {
		return element(by.id('inputUserName'));
	}
	getPasswordField() {
		return element(by.id('inputPassword'));
	}
	getEnterButton() {
		return element(by.cssContainingText('.btn', 'Enter'));
	}

	getErrorMessage() {
		return element(by.id('popup-message')).getText();
	}
}
