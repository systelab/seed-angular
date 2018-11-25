import { by, element } from 'protractor';
import { BasePage } from '../common/components/base-page';

export class MainPage extends BasePage {
	constructor() {
		super('systelab-app-frame');
	}

	public getFullUsernameField() {
		return this.getObjectById('username');
	}

	public getPatientButtton() {
		return this.getMainWindow().element(by.tagName('systelab-app-header')).all(by.tagName('button')).get(0);
	}
}
