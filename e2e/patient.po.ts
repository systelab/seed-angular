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
	getAField() {
		return element(by.css('patient-dialog #name'));
	}
	getCreateButton() {
		return element(by.buttonText('Create'));
	}
	getUpdateButton() {
		return element(by.buttonText('Update'));
	}

	getErrorMessage() {
		return element(by.id('popup-message'));
	}
}
