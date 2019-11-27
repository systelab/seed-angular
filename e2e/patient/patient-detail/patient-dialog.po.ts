import { by } from 'protractor';
import { BasePage } from '../../common/components/base-page';
import { Tabs } from '../../common/components/tabs-test';
import { Grid } from '../../common/components/grid-test';
import { Button } from '../../common/components/button-test';
import { InputField } from '../../common/components/inputfield-test';

export class PatientDetailPage extends BasePage {
	public static readonly TAG_NAME_PATIENTFORM = 'patient-form';
	public static readonly TAG_NAME_PATIENTALLERGIESFORM = 'patient-allergies-form';
	public static readonly tabs = ['General', 'Allergies'];

	constructor() {
		super('patient-dialog');
	}

	public getEnableSwich() {
		return this.getObjectById('PatientEnableSwitch')
			.element(by.tagname('input'));
	}

	public getSurnameInput(): InputField {
		return new InputField(this.getObjectById('PatientSurnameInput'));
	}

	public getNameInput(): InputField {
		return new InputField(this.getObjectById('PatientNameInput'));
	}

	public getEmailInput(): InputField {
		return new InputField(this.getObjectById('PatientEmailInput'));
	}

	public getAddressStreetInput(): InputField {
		return new InputField(this.getObjectById('PatientAddressStreetInput'));
	}

	public getAddressCityInput(): InputField {
		return new InputField(this.getObjectById('PatientAddressCityInput'));
	}

	public getAddressZipInput(): InputField {
		return new InputField(this.getObjectById('PatientAddressZipInput'));
	}

	public getAddressCoordinatesInput(): InputField {
		return new InputField(this.getObjectById('PatientAddressCoordinatesInput'));
	}

	public getAllButtons() {
		return this.current
			.element(by.tagName('systelab-dialog-bottom'))
			.all(by.tagName('button'));
	}

	public getButtonSubmit(): Button {
		return new Button(this.getObjectById('PatientSubmitButton'));
	}

	public getBMIndex() {
		return this.getObjectById('PatientBMIndexInput');
	}

	public getAllergyGrid(): Grid {
		return new Grid(this.current.element(by.tagName('patient-allergy-grid')));
	}

	public getAddButton(): Button {
		return new Button(this.getObjectById('PatientMaintenanceAddButton'));
	}

	public getTabs(): Tabs {
		return new Tabs(this.current.element(by.tagName('systelab-tabs')));
	}
}
