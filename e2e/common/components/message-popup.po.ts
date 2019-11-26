import { by } from 'protractor';
import { BasePage } from './base-page';
import { ButtonService } from './button.service';
import { TestUtil } from '../utilities/test-util';

export class MesssagePopupPage extends BasePage {
    public BUTTON_CLOSE = 0;
    public BUTTONS_YES_NO = 1;

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

    public getButtonClose() {
        return this.getButton('Close');
    }

    private getButton(text: string) {
        return this.getMainWindow()
            .element(by.tagName('systelab-dialog-bottom'))
            .element(by.buttonText(text)); // this depends on the system locale...
    }
}
