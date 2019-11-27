import { Widget } from './widget-test';
import { by, ElementArrayFinder } from 'protractor';

export class ContextMenu extends Widget {

	public async getOptions(): Promise<Array<string>> {
		let content: string[] = [];
		let rows: ElementArrayFinder = this.elem.all(by.tagName('systelab-context-menu-item'));
		let numberOfItems: number = await rows.count();
		for (let i = 0; i < numberOfItems; i++) {
			let text: string = await rows.get(i).element(by.tagName('a')).getText();
			content.push(text);
		}
		return content;
	}

	public async selectOption(i: number): Promise<void> {
		await this.elem.all(by.tagName('systelab-context-menu-item')).get(i).click();
	}
}
