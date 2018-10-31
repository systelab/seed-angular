import { ElementFinder } from 'protractor';

declare const allure: any;

export class TestUtil {

	public static checkField(field: ElementFinder, name: string, expectedValue: string) {

		allure.createStep(name + ' is equals to "' + expectedValue + '"', () => {
			expect(field.getAttribute('value')).toEqual(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
		})();
	}

	public static checkString(text: string, name: string, expectedValue: string) {
		allure.createStep(name + ' is equals to "' + text + '"', () => {
			expect(text).toEqual(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
		})();
	}
}
