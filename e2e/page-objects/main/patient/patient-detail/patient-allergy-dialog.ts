import { by } from 'protractor';
import { Button, Datepicker, InputField } from '../../../../widgets';
import { SystelabDialogTest } from '../../../../widgets/systelab-dialog-test';


export class PatientAllergyDialog extends SystelabDialogTest {

	public getSubmitButton(): Button {
		return new Button(this.byId('PatientSubmitButton'));
	}

	public getAllergyNotes(): InputField {
		return new InputField(this.byId('PatientAllergyNotes'));
	}

	public getAssertedDate(): Datepicker {
		return new Datepicker(this.elem.all(by.tagName('systelab-datepicker'))
			.get(0));
	}

	public getLastOccurrenceDate(): Datepicker {
		return new Datepicker(this.elem.all(by.tagName('systelab-datepicker'))
			.get(1));
	}

	public getAllergyCombobox() {
		return this.elem.element(by.tagName('allergy-combobox'));
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
