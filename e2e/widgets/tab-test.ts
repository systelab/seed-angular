import { Widget } from './widget-test';
import { by } from 'protractor';

export class Tab extends Widget {

	public async getText(): Promise<string> {
		return await this.elem.element(by.tagName('span')).getText();
	}
}
