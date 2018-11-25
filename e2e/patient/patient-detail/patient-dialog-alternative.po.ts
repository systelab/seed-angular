import { by, ElementFinder } from 'protractor';
import { BasePage } from '../../common/components/base-page';

export enum PatientDetail {
	Surname     = 'PatientSurnameInput',
	Name        = 'PatientNameInput',
	Email       = 'PatientEmailInput',
	Street      = 'PatientAddressStreetInput',
	City        = 'PatientAddressCityInput',
	Zip         = 'PatientAddressZipInput',
	Coordinates = 'PatientAddressCoordinatesInput',
}

export class PatientDetailAlternativePage extends BasePage {

	constructor() {
		super('patient-dialog');
	}

	public getEnableSwich() {
		return this.getObjectById('PatientEnableSwitch')
			.element(by.tagname('input'));
	}


	public get(field: string): ElementFinder {
		return this.getObjectById(field.toString());
	}

	public getAllButtons() {
		return this.getMainWindow()
			.element(by.tagName('systelab-dialog-bottom'))
			.all(by.tagName('button'));
	}

	public getButtonSubmit() {
		return this.getObjectById('PatientSubmitButton');
	}
}
