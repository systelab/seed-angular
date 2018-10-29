import { ElementFinder } from 'protractor';

declare const allure: any;

export class TestUtil {

	public static checkField(field: ElementFinder, name: string, expectedValue: string) {
			field
				.getAttribute('value')
				.then((inValue) => {
					allure.createStep('Field ' + name + ' is equals to "' + inValue + '"', () => {
						expect(inValue).toBe(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
					})();
				});
	}

	public static checkString(text: string, name: string, expectedValue: string) {
				allure.createStep('Field ' + name + ' is equals to "' + text + '"', () => {
					expect(text).toBe(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
				})();
	}
}
