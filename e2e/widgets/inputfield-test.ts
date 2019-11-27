import { Widget } from './widget-test';

export class InputField extends Widget {

	public async setText(text: string): Promise<void> {
		await this.elem.sendKeys(text);
	}
}
