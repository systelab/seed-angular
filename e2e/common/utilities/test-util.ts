import { ElementArrayFinder, ElementFinder } from 'protractor';
import { ExpectsUtil } from './expects-util';
import { FormData } from '../components/form.service';

declare const allure: any;

export class TestUtil extends ExpectsUtil {

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
