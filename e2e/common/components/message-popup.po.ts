import { by } from 'protractor';
import { BasePage } from './base-page';

export class MesssagePopupPage extends BasePage {
	constructor(index: number = 2) {
		super('mp-modal-container', index);
	}

	public getMainWindow() {
		return super.getMainWindow()
			.element(by.tagName('dialog-view'));
	}

	public getTextMessage() {
		return this.getObjectById('popup-message');
	}

	public getButtonYes() {
		return this.getButton('Yes');
	}

	public getButtonNo() {
		return this.getButton('No');

	}

	private getButton(text: string) {
		return this.getMainWindow()
			.element(by.tagName('systelab-dialog-bottom'))
			.element(by.buttonText(text)); // this depends on the system locale...
	}
}
