import { Widget } from './widget-test';
import { by } from 'protractor';
import { Tab } from './tab-test';

export class Tabs extends Widget {

	public async getNumberOfTabs(): Promise<number> {
		return await this.elem.all(by.tagName('systelab-tab')).count();
	}

	public getTab(i: number): Tab {
		return new Tab(this.elem.all(by.tagName('li')).get(i));
	}

	public async selectTab(i: number) {
		await this.elem.all(by.tagName('li')).get(i).click();
	}
}
