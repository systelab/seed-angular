import { by, ElementFinder } from 'protractor';

export class Widget {
	constructor(protected elem: ElementFinder) {
	}

	public getElement(): ElementFinder {
		return this.elem;
	}

	public async clear() {
		await this.elem.clear();
	}

	public async click(): Promise<void> {
		await this.elem.click();
	}

	public async setText(text: string): Promise<void> {
		await this.elem.sendKeys(text);
	}

	public async getText(): Promise<string> {
		return await this.elem.getText()
	}
}
