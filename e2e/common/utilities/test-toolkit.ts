import { browser, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { BasePage } from './base-page';
import { TestUtil } from './test-util';

declare const allure: any;

export interface ButtonState {
	name: string;
	exist: boolean;
	enable: boolean;
}

export class TestToolkit {

	public static readonly TIME_OUT_MS_FOR_DIALOG_WINDOW = 30000;

	public static showNewPageAndCheckTitleAndButtons(newPage: BasePage, expectedWindowTitle: string, buttons?: ButtonState[]) {

		browser.wait(EC.presenceOf(newPage.getMainWindow()), TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Dialog Window is taking too long to appear in the DOM (timeout: ' + TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
		TestToolkit.checkPresentAndDisplayed(newPage);

		allure.createStep('The title is valid', () => {
		});
		newPage.getTitle()
			.getText()
			.then((s) => {
				TestUtil.checkString(s.toLowerCase(), 'Window title', expectedWindowTitle);
			});

		if (buttons) {
			allure.createStep('The buttons are valid', () => {
			});
			newPage.checkButtons(buttons);

		}
	}

	public static checkPresentAndDisplayed(page: BasePage) {
		expect(page.getMainWindow()
			.isPresent())
			.toBe(true, 'Window should be present on the DOM');

		expect(page.getMainWindow()
			.isDisplayed())
			.toBe(true, 'Window should be displayed');
	}

	public static fillField(field: ElementFinder, name: string, value: string) {
		allure.createStep('Action: Fill "' + name + '"', () => {
			field
				.sendKeys(value)
				.then(() => {
					allure.createStep('"' + name + '" has the filled value', () => {
						field
							.getAttribute('value')
							.then((inValue) => {
								expect(inValue)
									.toBe(value, 'Field "' + name + '" was not properly filled');
							});
					})()
				});
		})();
	}
}
