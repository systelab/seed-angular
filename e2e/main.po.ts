import { browser, by, element } from 'protractor';

export class MainPage {

	getFullUsernameField() {
		return element(by.id('username'));
	}

	getPatientButton() {
		return element(by.buttonText('Patient'));
	}
}
