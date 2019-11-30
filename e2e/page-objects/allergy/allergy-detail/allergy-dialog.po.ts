import { by } from 'protractor';
import { Button, InputField } from '../../../widgets';
import { SystelabDialogTest } from '../../../widgets/systelab-dialog-test';
import { FormData } from '../../../services/form.service';

export class AllergyDetailDialog extends SystelabDialogTest {


    public getEnableSwitch() {
        return this.byId('AllergyEnableSwitch')
            .element(by.tagname('input'));
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


    public getFormData(i?: number): FormData[]{
        const baseAllergyValues = ['Name', 'A sign', 'A symptom'];
        const empty = (i === undefined);
        const formData: FormData[] = [{
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
        return (formData);
    }

}
