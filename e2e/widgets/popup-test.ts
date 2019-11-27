import { by, ElementFinder } from 'protractor';
import { Button } from './button-test';
import { Widget } from './widget-test';

export class Popup extends Widget {

	public async getText(): Promise<string> {
		return await this.elem.getText();
	}

	private async getButton(text: string) {
		return await new Button(this.elem
			.element(by.tagName('systelab-dialog-bottom'))
			.element(by.buttonText(text)));
	}
}
