import { browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { FormData } from '../services/form.service';
import { JSConsole } from './js-console';
import { Widget } from '../widgets';
import { BasePage } from '../page-objects/base-page';

declare const allure: any;

export class TestUtil {

	private static console = new JSConsole();

	public static init(tms: string, feature: string, version: string, user: string) {
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
		allure.addLabel('testExecutionDateTime', new Date().toLocaleString());
		this.console.clear();
	}

	public static hasErrorsInConsole() {
		return this.console.hasErrors();
	}

	public static checkNumber(n: Promise<number>, name: string, expectedCount: number, verbose = true) {
		let expectation = (n, name, expectedCount) => expect(n)
			.toEqual(expectedCount, 'Count "' + name + '" should be ' + expectedCount)
		this.doIt3(expectation, verbose, name + ' is equals to ' + expectedCount, n, name, expectedCount);
	}

	public static checkBoolean(n: Promise<boolean>, name: string, verbose = true) {
		let expectation = (n, name) => expect(n).toBeTruthy(name)
		this.doIt2(expectation, verbose, name, n, name);
	}

	public static checkText(text: Promise<string>, name: string, expectedText: string, verbose = true) {
		let expectation = (text, name, expectedText) =>expect(text)
			.toEqual(expectedText, 'Field "' + name + '" should be ' + expectedText);
		this.doIt3(expectation, verbose, name + ' is equals to' + expectedText, text, name, expectedText);
	}

	public static checkForm(formData: FormData[], name: string, verbose = true) {
		let expectation =(formData, name)=>formData.forEach((formDataItem) => {
			expect(formDataItem.field.getText())
				.toEqual(formDataItem.value, 'Field "' + formDataItem.name + '" in form "' + name + '" should be ' + formDataItem.value);
		});
		this.doIt2(expectation, verbose, 'Check data in form ' + name, formData, name);
	}

	public static checkIsPresent(field: ElementFinder, name: string, verbose = true) {

		let expectation = (field, name) => expect(field.isPresent())
			.toEqual(true, name + ' is present');
		this.doIt2(expectation, verbose, name + ' is present', field, name);
	}

	public static checkIsNoPresent(field: ElementFinder, name: string, verbose = true) {

		let expectation = (field, name) => expect(field.isPresent())
			.toEqual(false, name + ' is not present');
		this.doIt2(expectation, verbose, name + ' is not present', field, name);
	}

	public static checkIsEnabled(field: ElementFinder, name: string, verbose = true) {

		let expectation = (field, name) => expect(field.isEnabled())
			.toEqual(true, name + ' is enabled');
		this.doIt2(expectation, verbose, name + ' is enabled', field, name);
	}

	public static checkIsDisabled(field: ElementFinder, name: string, verbose = true) {

		let expectation = (field, name) => expect(field.isEnabled())
			.toEqual(null, name + ' is disabled');
		this.doIt2(expectation, verbose, name + ' is disabled', field, name);
	}

	public static checkAttribute(field: ElementFinder, attributeName: string, name: string, expectedValue: string, verbose = true) {
		let expectation = (field, attributeName, name, expectedValue)=>expect(field.getAttribute(attributeName))
			.toEqual(expectedValue, 'Attribute: "' + attributeName + '" of Field: "' + name + '" should be ' + expectedValue);
		this.doIt4(expectation, verbose, 'Attribute: "' + attributeName + '" of Field: "' + name + '" is equal ' + expectedValue, field, attributeName, name, expectedValue);
	}

	public static checkDisableAttribute(field: ElementFinder, name: string, expectedValue: string, verbose = true) {
		let expectation = (field, name, expectedValue )=>expect(field.getAttribute('disabled'))
			.toEqual(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
		this.doIt3(expectation, verbose, 'Field "' + name + '" is disabled is equal ' + expectedValue, field, name, expectedValue);
	}

	public static checkPageIsPresentAndDisplayed(page: BasePage) {
		expect(page.isPresent())
			.toEqual(true, 'Window should be present on the DOM');
		expect(page.isDisplayed())
			.toEqual(true, 'Window should be displayed');
	}

	public static checkWidgetPresentAndDisplayed(obj: Widget, desc: string)
	{
		let expectation = (obj,desc)=> {
			expect(obj.isPresent())
				.toEqual(true, desc + ' should be present on the DOM');
			expect (obj.isDisplayed())
				.toEqual(true, desc + ' should be displayed'); };

		this.doIt2(expectation, false, 'Widget is Present', obj, desc);
	}

	private static doIt2(expectation: (x,y) => any, verbose, text, param1, param2) {
		if (verbose) {
			allure.createStep(text, () => {
				expectation(param1, param2);
			})();
		} else {
			expectation(param1, param2);
		}
	}

	private static doIt3(expectation: (x,y,z) => any, verbose, text, param1, param2, param3) {
		if (verbose) {
			allure.createStep(text, () => {
				expectation(param1, param2, param3);
			})();
		} else {
			expectation(param1, param2, param3);
		}
	}

	private static doIt4(expectation: (x,y,z,k) => any, verbose, text, param1, param2, param3, param4) {
		if (verbose) {
			allure.createStep(text, () => {
				expectation(param1, param2, param3, param4);
			})();
		} else {
			expectation(param1, param2, param3, param4);
		}
	}
}
