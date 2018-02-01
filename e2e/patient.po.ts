import { by, element } from 'protractor';

export class PatientPage {


	getNameField() {
		return element(by.id('name'));
	}
	getSurnameField() {
		return element(by.id('surname'));
	}
	getEMailField() {
		return element(by.id('email'));
	}
	getCreateButton() {
		return element(by.buttonText('Create'));
	}

	getErrorMessage() {
		return element(by.id('popup-message'));
	}
}
