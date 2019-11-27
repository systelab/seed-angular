import { by } from 'protractor';
import { BasePage } from '../../base-page';
import { Button, Datepicker, InputField } from '../../../widgets';


export class PatientAllergyDetailPage extends BasePage {

	constructor() {
		super('patient-allergy-dialog');
	}

	public getSubmitButton(): Button {
		return new Button(this.getObjectById('PatientSubmitButton'));
	}

	public getAllergyNotes(): InputField {
		return new InputField(this.getObjectById('PatientAllergyNotes'));
	}

	public getAssertedDate(): Datepicker {
		return new Datepicker(this.current.all(by.tagName('systelab-datepicker'))
			.get(0));
	}

	public getLastOccurrenceDate(): Datepicker {
		return new Datepicker(this.current.all(by.tagName('systelab-datepicker'))
			.get(1));
	}

	public getAllergyCombobox() {
		return this.current.element(by.tagName('allergy-combobox'));
	}

	public getAllergyComboInput() {
		return this.getAllergyCombobox()
			.element(by.tagName('input'));
	}

	public getAllergyList() {
		return this.getAllergyCombobox()
			.all(by.css('.ag-cell-value'));
	}
}
