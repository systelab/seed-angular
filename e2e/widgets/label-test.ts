import { Widget } from './widget-test';

export class Label extends Widget {

	public async getText(): Promise<string> {
		return await this.elem.getText()
	}
}
