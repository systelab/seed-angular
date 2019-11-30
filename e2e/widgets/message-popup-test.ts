import { by, element } from 'protractor';
import { Button, Widget } from '../widgets';

export class MesssagePopupPage extends Widget {
    public BUTTON_CLOSE = 0;
    public BUTTONS_YES_NO = 1;

    constructor() {
        super(element.all(by.tagName('mp-modal-container')).element(by.tagName('dialog-view')));
    }

    public getTextMessage() {
        return this.elem.element(by.id('popup-message'));
    }

    public getButtonYes(): Button {
        return this.getButton('Yes');
    }

    public getButtonNo(): Button {
        return this.getButton('No');
    }

    public getButtonClose(): Button {
        return this.getButton('Close');
    }

    private getButton(text: string): Button {
        return new Button(this.elem
            .element(by.tagName('systelab-dialog-bottom'))
            .element(by.buttonText(text))); // this depends on the system locale...
    }
}
