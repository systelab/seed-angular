import { ElementArrayFinder, ElementFinder } from 'protractor';

declare const allure: any;

export class TestUtil {

	public static checkValue(field: ElementFinder, name: string, expectedValue: string) {
		allure.createStep(name + ' is equals to "' + expectedValue + '"', () => {
			expect(field.getAttribute('value')).toEqual(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
		})();
	}

	public static checkCount(field: ElementArrayFinder, name: string, expectedCount: number) {
		allure.createStep(name + ' is equals to "' + expectedCount + '"', () => {
			expect(field.count())
				.toEqual(expectedCount, 'Count "' + name + '" should be ' + expectedCount);
		})();
	}

	public static checkText(field: ElementFinder, name: string, expectedText: string) {
		allure.createStep(name + ' is equals to "' + expectedText + '"', () => {
			expect(field.getText())
				.toEqual(expectedText, 'Field "' + name + '" should be ' + expectedText);
		})();
	}

	public static checkMenuOptions(field: ElementFinder, options: string[]) {
		allure.createStep('Menu options are equals to "' + options + '"', () => {
			expect(field.getText())
				.toEqual(options, 'Menu options should be ' + options);
		})();
	}

	public static checkIsPresent(field: ElementFinder, name: string) {
			allure.createStep(name + ' is present', () => {
				expect(field.isPresent()).toEqual(true, name + ' is present');
			})();
		}

	public static checkIsEnabled(field: ElementFinder, name: string) {
		allure.createStep(name + ' is enabled', () => {
			expect(field.isEnabled()).toEqual(true, name + ' is enabled');
		})();
	}

	public static checkIsDisabled(field: ElementFinder, name: string) {
		allure.createStep(name + ' is disabled', () => {
			expect(field.isEnabled()).toEqual(null, name + ' is disabled');
		})();
	}
}
