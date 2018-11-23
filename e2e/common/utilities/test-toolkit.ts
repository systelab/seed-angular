import { browser, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { BasePage } from './base-page';
import { TestUtil } from './test-util';
import { JSConsole } from './js-console';

declare const allure: any;

export interface ButtonState {
	name: string;
	exist: boolean;
	enable: boolean;
}

export interface FormData {
	field: ElementFinder;
	name: string;
	value: string;
}

export class TestToolkit {

	private static console = new JSConsole();

	public static readonly TIME_OUT_MS_FOR_DIALOG_WINDOW = 30000;

	public static init(tms: string, feature: string, version: string, user: string, currentDate: string, currentTime: string) {
		allure.addLabel('tms', tms);
		allure.addLabel('feature', feature);
		browser.driver.getCapabilities()
			.then((caps) => {
				browser.browserName = caps.get('browserName');
				allure.addLabel('browser', browser.browserName);
			});
		if (version) {
			allure.addLabel('appVersion', version);
		}
		if (user) {
			allure.addLabel('tester', user);
		}
		if (currentDate && currentTime) {
			allure.addLabel('testExecutionDateTime', currentDate + ' ' + currentTime);
		}
	}

	public static showNewPageAndCheckTitleAndButtons(newPage: BasePage, expectedWindowTitle: string, buttons?: ButtonState[]) {

		browser.wait(EC.presenceOf(newPage.getMainWindow()), TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Dialog Window is taking too long to appear in the DOM (timeout: ' + TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
		TestToolkit.checkPresentAndDisplayed(newPage);

		TestUtil.checkText(newPage.getTitle(), 'Window title', expectedWindowTitle);
		if (buttons) {
			this.checkButtons(newPage, buttons);
		}
	}

	public static checkPresentAndDisplayed(page: BasePage) {
		expect(page.getMainWindow().isPresent()).toEqual(true, 'Window should be present on the DOM');
		expect(page.getMainWindow().isDisplayed()).toEqual(true, 'Window should be displayed');
	}

	public static removeValuesInForm(formData: FormData[], name: string) {
		allure.createStep('Action: Remove all values in form "' + name + '"', () => {
			formData.forEach((formDataItem) => {
				TestToolkit.clearField(formDataItem.field);
			});
		})();
	}

	public static fillForm(formData: FormData[], name: string) {
		allure.createStep('Action: Fill form "' + name + '"', () => {
			formData.forEach((formDataItem) => {
				formDataItem.field.sendKeys(formDataItem.value);
				expect(formDataItem.field.getAttribute('value')).toEqual(formDataItem.value, 'Field "' + formDataItem.name + '" in form "' + name + '" should be ' + formDataItem.value);
			});
		})();
	}

	public static clearField(field: ElementFinder) {
			field.clear();
	}

	public static fillField(field: ElementFinder, name: string, value: string) {
		allure.createStep('Action: Fill "' + name + '" with value ' + value, () => {
			field.sendKeys(value);
			 // TestUtil.checkValue(field, name, value);
		})();
	}

	public static checkButtons(page: BasePage, buttons: ButtonState[]) {
		allure.createStep('Action: Review buttons: ', () => {

			TestUtil.checkCount(page.getAllButtons(), `Number of buttons`, buttons.filter((b) => b.exist).length);

			buttons.forEach((buttonElem) => {
				TestUtil.checkIsPresent(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
			});

			buttons.filter((b) => b.enable)
				.forEach((buttonElem) => {
					TestUtil.checkIsEnabled(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
				});
			buttons.filter((b) => !b.enable)
				.forEach((buttonElem) => {
					TestUtil.checkIsDisabled(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
				});
		})();
	}

	public static clearConsole() {
		return this.console.clear();
	}

	public static hasErrorsInConsole() {
		return this.console.hasErrors();
	}

	public static getCurrentTime() {
		let strReturn = '';

		const today = new Date();
		const hh = today.getHours();
		const mm = today.getMinutes();
		const ss = today.getSeconds();

		if (hh < 10) {
			strReturn = '0';
		}
		strReturn += hh + ':';

		if (mm < 10) {
			strReturn += '0';
		}
		strReturn += mm + ':';

		if (ss < 10) {
			strReturn += '0';
		}
		strReturn += ss;

		return strReturn;
	}

	public static getCurrentDate() {
		let strReturn = '';

		const today = new Date();
		const dd = today.getDate();
		const mm = today.getMonth() + 1; // January is 0!
		const yyyy = today.getFullYear();

		if (dd < 10) {
			strReturn = '0';
		}

		strReturn += dd + '/';
		if (mm < 10) {
			strReturn += '0';
		}

		strReturn += mm + '/' + yyyy;
		return strReturn;
	}
}
