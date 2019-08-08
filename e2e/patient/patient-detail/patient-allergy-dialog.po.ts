import { BasePage } from '../../common/components/base-page';
import { by } from 'protractor';

export class PatientAllergyDetailPage extends BasePage {

    constructor() {
        super('patient-allergy-dialog');
    }

    public getSubmitButton() {
        return this.getObjectById('PatientSubmitButton');
    }

    public getAllergyNotes() {
        return this.getObjectById('PatientAllergyNotes');
    }

    public getAssertedDate() {
        return this.getMainWindow().all(by.tagName('systelab-datepicker')).get(0);
    }

    public getAssertedDateInput() {
        return this.getAssertedDate().element(by.tagName('input'));
    }
    public getLastOccurrenceDate() {
        return this.getMainWindow().all(by.tagName('systelab-datepicker')).get(1);
    }

    public getLastOccurrenceDateInput() {
        return this.getLastOccurrenceDate().element(by.tagName('input'));
    }

    public getAllergyCombobox() {
        return this.getMainWindow().element(by.tagName('allergy-combobox'));
    }

    public getAllergyComboInput() {
        return this.getAllergyCombobox().element(by.tagName('input'));
    }

    public getAllergyList() {
        return this.getAllergyCombobox().all(by.css('.ag-cell-value'));
    }
}
