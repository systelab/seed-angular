import { by } from 'protractor';
import { BasePage } from '../../common/components/base-page';
import { TabService } from '../../common/components/tab.service';

export class PatientDetailPage extends BasePage {
	public static readonly  TAG_NAME_PATIENTFORM = 'patient-form';
	public static readonly TAG_NAME_PATIENTALLERGIESFORM = 'patient-allergies-form';
	public static readonly  tabs = ['General', 'Allergies'];

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

	public getAllTabs() {
		return TabService.getAllTabs(this.getMainWindow());
	}

	public getBMIndex() {
		return this.getObjectById('PatientBMIndexInput');
	}

	public getAllergyGrid() {
		return this.getMainWindow().element(by.tagName('patient-allergy-grid'));
	}

	public getAddButton() {
		return this.getObjectById('PatientMaintenanceAddButton');
	}
}
