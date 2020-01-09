import {by, element} from 'protractor';
import {PatientAllergyDialog} from './patient-allergy-dialog';
import {Button, Grid, InputField, Dialog, Tabs} from 'systelab-components-test';

export class PatientDialog extends Dialog {

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

	public async clear() {
		await this.getNameInput().clear();
		await this.getSurnameInput().clear();
		await this.getEmailInput().clear();
		await this.getAddressStreetInput().clear();
		await this.getAddressCityInput().clear();
		await this.getAddressZipInput().clear();
		await this.getAddressCoordinatesInput().clear();
	}

	public async set(patient: any) {
		await this.getNameInput().setText(patient.name);
		await this.getSurnameInput().setText(patient.surname);
		await this.getEmailInput().setText(patient.email);
		await this.getAddressStreetInput().setText(patient.address.street);
		await this.getAddressCityInput().setText(patient.address.city);
		await this.getAddressZipInput().setText(patient.address.zip);
		await this.getAddressCoordinatesInput().setText(patient.address.coordinates);
	}

	public async get() {
		return {
			name: await this.getNameInput().getText(),
			surname: await this.getSurnameInput().getText(),
			email: await this.getEmailInput().getText(),
			address: {
				street: await this.getAddressStreetInput().getText(),
				city: await this.getAddressCityInput().getText(),
				zip: await this.getAddressZipInput().getText(),
				coordinates: await this.getAddressCoordinatesInput().getText()
			}
		};
	}
}
