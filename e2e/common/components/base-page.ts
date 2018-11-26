import { browser, by, element, ElementArrayFinder, ExpectedConditions as EC } from 'protractor';
import { ButtonService, ButtonState } from './button.service';
import { TestUtil } from '../utilities/test-util';

export class BasePage {

	public static readonly NOT_RETRIEVED = '<not retrieved yet, available after calling navigateToHomePage()>';
	public static readonly TIME_OUT_MS_FOR_DIALOG_WINDOW = 30000;

	constructor(protected tagName: string, protected tagNameIndex: number = 0) {
	}

	public getAllButtons(): ElementArrayFinder {
		return new ElementArrayFinder(browser);
	}

	public getMainWindow() {
		return element.all(by.tagName(this.tagName))
			.get(this.tagNameIndex);
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

	public checkPresentAndDisplayed() {
		expect(this.getMainWindow()
			.isPresent())
			.toEqual(true, 'Window should be present on the DOM');
		expect(this.getMainWindow()
			.isDisplayed())
			.toEqual(true, 'Window should be displayed');
	}

	public showNewPageAndCheckTitleAndButtons(expectedWindowTitle: string, buttons?: ButtonState[]) {

		browser.wait(EC.presenceOf(this.getMainWindow()), BasePage.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Dialog Window is taking too long to appear in the DOM (timeout: ' + BasePage.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
		this.checkPresentAndDisplayed();

		TestUtil.checkText(this.getTitle(), 'Window title', expectedWindowTitle);
		if (buttons) {
			ButtonService.checkButtons(this, buttons);
		}
	}

}
