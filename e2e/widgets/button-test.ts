import { Widget } from './widget-test';

export class Button extends Widget {

	public async click(): Promise<void> {
		await this.elem.click();
	}
}
