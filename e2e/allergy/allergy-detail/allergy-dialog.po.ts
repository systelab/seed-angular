import { BasePage } from '../../common/components/base-page';
import { by } from 'protractor';
import { TabService } from '../../common/components/tab.service';

export class AllergyDetailPage extends BasePage {

    constructor() {
        super('allergy-dialog');
    }

    public getEnableSwitch() {
        return this.getObjectById('AllergyEnableSwitch')
            .element(by.tagname('input'));
    }

    public getNameInput() {
        return this.getObjectById('AllergyNameInput');
    }

    public getSignsInput() {
        return this.getObjectById('AllergySignsInput');
    }

    public getSymptomsInput() {
        return this.getObjectById('AllergySymptomsInput');
    }

    public getAllButtons() {
        return this.getMainWindow()
            .element(by.tagName('systelab-dialog-bottom'))
            .all(by.tagName('button'));
    }

    public getButtonSubmit() {
        return this.getObjectById('AllergySubmitButton');
    }
}
