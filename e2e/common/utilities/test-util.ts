import { browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { ExpectsUtil } from './expects-util';
import { FormData } from '../components/form.service';
import { JSConsole } from './js-console';

declare const allure: any;

export class TestUtil extends ExpectsUtil {

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

	public static checkValue(field: ElementFinder, name: string, expectedValue: string) {
		allure.createStep(name + ' is equals to ' + expectedValue , () => {
			super.checkValue(field, name, expectedValue);
		})();
	}

	public static checkCount(field: ElementArrayFinder, name: string, expectedCount: number) {
		allure.createStep(name + ' is equals to ' + expectedCount, () => {
			super.checkCount(field, name, expectedCount);
		})();
	}

	public static checkText(field: ElementFinder, name: string, expectedText: string) {
		allure.createStep(name + ' is equals to ' + expectedText, () => {
			super.checkText(field, name, expectedText);
		})();
	}

	public static checkForm(formData: FormData[], name: string) {
		allure.createStep('Check data in form ' + name, () => {
			super.checkForm(formData, name);
		})();
	}

	// TODO: To be moved and improve contains by an exact check
	public static checkMenuOptions(field: ElementFinder, options: string[]) {
		allure.createStep('Menu options are equals to ' + options, () => {
			super.checkMenuOptions(field, options);
		})();
	}

	public static checkIsPresent(field: ElementFinder, name: string) {
		allure.createStep(name + ' is present', () => {
			super.checkIsPresent(field, name);
		})();
	}

	public static checkIsEnabled(field: ElementFinder, name: string) {
		allure.createStep(name + ' is enabled', () => {
			super.checkIsEnabled(field, name);
		})();
	}

	public static checkIsDisabled(field: ElementFinder, name: string) {
		allure.createStep(name + ' is disabled', () => {
			super.checkIsDisabled(field, name);
		})();
	}
}
