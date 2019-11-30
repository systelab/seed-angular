import { by } from 'protractor';
import { Button, InputField, SystelabDialogTest } from 'systelab-components-test';
import { FormInputElement } from 'systelab-components-test/lib/services';

export class AllergyDetailDialog extends SystelabDialogTest {

    public getEnableSwitch() {
        return this.byId('AllergyEnableSwitch').element(by.tagname('input'));
    }

    public getNameInput(): InputField {
        return new InputField(this.byId('AllergyNameInput'));
    }

    public getSignsInput(): InputField {
        return new InputField(this.byId('AllergySignsInput'));
    }

    public getSymptomsInput(): InputField {
        return new InputField(this.byId('AllergySymptomsInput'));
    }

    public getButtonSubmit(): Button {
        return new Button(this.byId('AllergySubmitButton'));
    }

    public getFormData(i?: number): FormInputElement[]{
        const baseAllergyValues = ['Name', 'A sign', 'A symptom'];
        const empty = (i === undefined);
        const form: FormInputElement[] = [{
            field: this.getNameInput(),
            name: 'Name',
            value: empty ? '' : 'Try #' + i + ': ' + baseAllergyValues[0]
        }, {
            field: this.getSignsInput(),
            name: 'Signs',
            value: empty ? '' : 'Try #' + i + ': ' + baseAllergyValues[1]
        }, {
            field: this.getSymptomsInput(),
            name: 'Symptoms',
            value: empty ? '' : 'Try #' + i + ': ' + baseAllergyValues[2]
        }];
        return (form);
    }
}
