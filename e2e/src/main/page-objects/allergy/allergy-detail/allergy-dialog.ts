import { by, ElementFinder } from 'protractor';
import {Button, InputField, Dialog} from 'systelab-components-test';

export class AllergyDetailDialog extends Dialog {
	constructor(elem: ElementFinder) {
		super(elem);
	}

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

	public async clear() {
		await this.getNameInput().clear();
		await this.getSignsInput().clear();
		await this.getSymptomsInput().clear();
	}

	public async set(allergy) {
		await this.getNameInput().setText(allergy.name);
		await this.getSignsInput().setText(allergy.sign);
		await this.getSymptomsInput().setText(allergy.symptom);
	}

	public async get() {
		return {
			name: await this.getNameInput().getText(),
			sign: await this.getSignsInput().getText(),
			symptom: await this.getSymptomsInput().getText()
		};
	}
}
