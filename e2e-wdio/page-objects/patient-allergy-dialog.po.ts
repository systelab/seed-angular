import { Button, ComboBox, Datepicker, InputField, Dialog } from "systelab-components-wdio-test";


export class PatientAllergyDialog extends Dialog {

    public getSubmitButton(): Button {
        return new Button(this.byId("PatientSubmitButton"));
    }

    public getAllergyNotes(): InputField {
        return new InputField(this.byId("PatientAllergyNotes"));
    }

    public getAssertedDate(): Datepicker {
        return new Datepicker(this.allByTagName("systelab-datepicker").get(0));
    }

    public getLastOccurrenceDate(): Datepicker {
        return new Datepicker(this.allByTagName("systelab-datepicker").get(1));
    }

    public getAllergyCombobox(): ComboBox {
        return new ComboBox(this.byTagName("allergy-combobox"));
    }

    public async set(allergyForPatient) {
        if (allergyForPatient.allergy != "") {
            await this.getAllergyCombobox().click();
            await this.getAllergyCombobox().selectOptionByText(allergyForPatient.allergy);
        }
        await this.getAssertedDate().setValue(allergyForPatient.assertedDate);
        await this.getLastOccurrenceDate().setValue(allergyForPatient.lastOccurrence);
        await this.getAllergyNotes().setText(allergyForPatient.comments);
    }
}
