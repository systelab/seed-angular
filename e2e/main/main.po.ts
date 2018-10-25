import { by, element } from 'protractor';
import {MainDialogUtil} from '../common/utilities/main-dialog.util';

export class MainPage extends MainDialogUtil {
	constructor() {
		super('systelab-app-frame');
	}

	getFullUsernameField() {
		return this.getObjectById('username');
	}

	getPatientButtton() {
		return this.getMainWindow().element(by.tagName('systelab-app-header')).all(by.tagName('button')).get(0);
	}
}
