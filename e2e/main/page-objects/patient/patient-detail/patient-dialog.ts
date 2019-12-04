import { by, element } from 'protractor';
import { PatientAllergyDialog } from './patient-allergy-dialog';
import { Button, Grid, InputField, SystelabDialogTest, Tabs } from 'systelab-components-test';
import { FormButtonElement, FormInputElement } from 'systelab-components-test/lib/services';

export class PatientDialog extends SystelabDialogTest {

	public title = 'Create Patient';
	public buttons: FormButtonElement[] = [{
		name:   'Create',
		exist:  true,
		enable: true
	}];
	public patientTabTitles = ['General', 'Allergies'];

	public getEnableSwich() {
		return this.byId('PatientEnableSwitch').element(by.tagname('input'));
	}

	public getSurnameInput(): InputField {
		return new InputField(this.byId('PatientSurnameInput'));
	}

	public getNameInput(): InputField {
		return new InputField(this.byId('PatientNameInput'));
	}

	public getEmailInput(): InputField {
		return new InputField(this.byId('PatientEmailInput'));
	}

	public getAddressStreetInput(): InputField {
		return new InputField(this.byId('PatientAddressStreetInput'));
	}

	public getAddressCityInput(): InputField {
		return new InputField(this.byId('PatientAddressCityInput'));
	}

	public getAddressZipInput(): InputField {
		return new InputField(this.byId('PatientAddressZipInput'));
	}

	public getAddressCoordinatesInput(): InputField {
		return new InputField(this.byId('PatientAddressCoordinatesInput'));
	}

	public getButtonSubmit(): Button {
		return new Button(this.byId('PatientSubmitButton'));
	}

	public getBMIndex() {
		return this.byId('PatientBMIndexInput');
	}

	public getAllergyGrid(): Grid {
		return new Grid(this.elem.element(by.tagName('patient-allergy-grid')));
	}

	public getAddButton(): Button {
		return new Button(this.byId('PatientMaintenanceAddButton'));
	}

	public getTabs(): Tabs {
		return new Tabs(this.elem.element(by.tagName('systelab-tabs')));
	}

	public getPatientAllergyDialog(): PatientAllergyDialog {
		return new PatientAllergyDialog(element(by.tagName('patient-allergy-dialog')));
	}

	public getInputElements(i?: number): FormInputElement[] {
		const values = ['Surname', 'Name', 'email@werfen.com', 'Plaza de Europa, 21-23', 'Barcelona', '08908', '41.356439, 2.127791'];

		const empty = (i === undefined);
		const form: FormInputElement[] = [{
			field: this.getSurnameInput(),
			name:  'Surname',
			value: empty ? '' : 'Try #' + i + ': ' + values[0]
		}, {
			field: this.getNameInput(),
			name:  'Name',
			value: empty ? '' : 'Try #' + i + ': ' + values[1]
		}, {
			field: this.getEmailInput(),
			name:  'Email',
			value: empty ? '' : 'try_' + i + '_' + values[2]
		}, {
			field: this.getAddressStreetInput(),
			name:  'Address -> Street',
			value: empty ? '' : 'Try #' + i + ': ' + values[3]
		}, {
			field: this.getAddressCityInput(),
			name:  'Address -> City',
			value: empty ? '' : 'Try #' + i + ': ' + values[4]
		}, {
			field: this.getAddressZipInput(),
			name:  'Address -> Zip',
			value: empty ? '' : 'Try #' + i + ': ' + values[5]
		}, {
			field: this.getAddressCoordinatesInput(),
			name:  'Address -> Coordinates',
			value: empty ? '' : 'Try #' + i + ': ' + values[6]
		}];
		return (form);
	}
}
