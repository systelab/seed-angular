import {by} from 'protractor';
import {Button, ComboBox, Datepicker, InputField, Dialog} from 'systelab-components-test';

export class PatientAllergyDialog extends Dialog {

	public getSubmitButton(): Button {
		return new Button(this.byId('PatientSubmitButton'));
	}

	public getAllergyNotes(): InputField {
		return new InputField(this.byId('PatientAllergyNotes'));
	}

	public getAssertedDate(): Datepicker {
		return new Datepicker(this.elem.all(by.tagName('systelab-datepicker')).get(0));
	}

	public getLastOccurrenceDate(): Datepicker {
		return new Datepicker(this.elem.all(by.tagName('systelab-datepicker')).get(1));
	}

	public getAllergyCombobox(): ComboBox {
		return new ComboBox(this.elem.element(by.tagName('allergy-combobox')));
	}

	public async set(allergyForPatient) {
		await this.getAllergyCombobox().click();
		await this.getAllergyCombobox().selectOptionByText(allergyForPatient.allergy);

		await this.getAssertedDate().setValue(allergyForPatient.assertedDate);
		await this.getLastOccurrenceDate().setValue(allergyForPatient.lastOccurrenceDate);

		await this.getAllergyNotes().setText(allergyForPatient.comments);
	}
}
