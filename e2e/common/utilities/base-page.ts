import { browser, by, element, ElementArrayFinder} from 'protractor';

export class BasePage {

	public static readonly NOT_RETRIEVED = '<not retrieved yet, available after calling navigateToHomePage()>';

	constructor(protected tagName: string, protected tagNameIndex: number = 0) {
	}

	public getAllButtons(): ElementArrayFinder {
		return new ElementArrayFinder(browser);
	}

	public getMainWindow() {
		return element.all(by.tagName(this.tagName)).get(this.tagNameIndex);
	}

	public getTitle() {
		return this.getMainWindow()
			.element(by.tagName('systelab-dialog-header'))
			.element(by.className('slab-dialog-header'));
	}

	public getButtonClose() {
		return this.getMainWindow()
			.element(by.className('slab-dialog-close'));
	}

	public getObjectById(id: string) {
		return this.getMainWindow()
			.element(by.id(id));
	}

	public getButtonByName(name: string) {
		return this.getMainWindow()
			.element(by.buttonText(name));
	}

}
