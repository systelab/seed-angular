import { by } from 'protractor';
import { Button, InputField } from '../../../widgets';
import { BasePage } from '../../base-page';



export class AllergyDetailPage extends BasePage {

    constructor() {
        super('allergy-dialog');
    }

    public getEnableSwitch() {
        return this.getObjectById('AllergyEnableSwitch')
            .element(by.tagname('input'));
    }

    public getNameInput(): InputField {
        return new InputField(this.getObjectById('AllergyNameInput'));
    }

    public getSignsInput(): InputField {
        return new InputField(this.getObjectById('AllergySignsInput'));
    }

    public getSymptomsInput(): InputField {
        return new InputField(this.getObjectById('AllergySymptomsInput'));
    }

    public getAllButtons() {
        return this.current
            .element(by.tagName('systelab-dialog-bottom'))
            .all(by.tagName('button'));
    }

    public getButtonSubmit(): Button {
        return new Button(this.getObjectById('AllergySubmitButton'));
    }

}
