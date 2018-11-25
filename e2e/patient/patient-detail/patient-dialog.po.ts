import { by } from 'protractor';
import { BasePage } from '../../common/components/base-page';

export class PatientDetailPage extends BasePage {
	constructor() {
		super('patient-dialog');
	}

	public getEnableSwich() {
		return this.getObjectById('PatientEnableSwitch')
			.element(by.tagname('input'));
	}

	public getSurnameInput() {
		return this.getObjectById('PatientSurnameInput');
	}

	public getNameInput() {
		return this.getObjectById('PatientNameInput');
	}

	public getEmailInput() {
		return this.getObjectById('PatientEmailInput');
	}

	public getAddressStreetInput() {
		return this.getObjectById('PatientAddressStreetInput');
	}

	public getAddressCityInput() {
		return this.getObjectById('PatientAddressCityInput');
	}

	public getAddressZipInput() {
		return this.getObjectById('PatientAddressZipInput');
	}

	public getAddressCoordinatesInput() {
		return this.getObjectById('PatientAddressCoordinatesInput');
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
