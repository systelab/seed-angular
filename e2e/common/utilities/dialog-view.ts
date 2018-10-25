import { protractor, browser, by, element }  from 'protractor';
//import { Promise }              from 'es6-promise';
import {MainDialogUtil}         from './main-dialog.util';
import {ComponentUtilService} from './component.util.service';

export class DialogView extends MainDialogUtil {
	constructor(index?:number) {
		if (index === undefined) {
			super("mp-modal-container", 2);
		} else {
			super("mp-modal-container", index);
		}
	}

	protected _mainWindow() {
		return super._mainWindow().element(by.tagName("dialog-view"));
	}

	getTextMessage() {
		return this.getObjectById('popup-message');
	}

	getBtnYes() {
		return this.getMainWindow().element(by.tagName("systelab-dialog-bottom")).element(by.buttonText('Yes')); // this depends on the system locale...
	}

	getBtnNo() {
		return this.getMainWindow().element(by.tagName("systelab-dialog-bottom")).element(by.buttonText('No')); // this depends on the system locale...
	}
}