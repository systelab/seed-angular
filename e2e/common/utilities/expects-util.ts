import { ElementArrayFinder, ElementFinder } from 'protractor';
import { FormData } from '../components/form.service';

export class ExpectsUtil {

	public static checkValue(field: ElementFinder, name: string, expectedValue: string) {
		expect(field.getAttribute('value'))
			.toEqual(expectedValue, 'Field "' + name + '" should be ' + expectedValue);
	}

	public static checkCount(field: ElementArrayFinder, name: string, expectedCount: number) {
		expect(field.count())
			.toEqual(expectedCount, 'Count "' + name + '" should be ' + expectedCount);
	}

	public static checkText(field: ElementFinder, name: string, expectedText: string) {
		expect(field.getText())
			.toEqual(expectedText, 'Field "' + name + '" should be ' + expectedText);
	}

	public static checkForm(formData: FormData[], name: string) {
		formData.forEach((formDataItem) => {
			expect(formDataItem.field.getAttribute('value'))
				.toEqual(formDataItem.value, 'Field "' + formDataItem.name + '" in form "' + name + '" should be ' + formDataItem.value);
		});
	}

	public static checkMenuOptions(field: ElementFinder, options: string[]) {
		options.forEach((option) => {
			expect(field.getText())
				.toContain(option);
		});
	}

	public static checkIsPresent(field: ElementFinder, name: string) {
		expect(field.isPresent())
			.toEqual(true, name + ' is present');
	}

	public static checkIsEnabled(field: ElementFinder, name: string) {
		expect(field.isEnabled())
			.toEqual(true, name + ' is enabled');
	}

	public static checkIsDisabled(field: ElementFinder, name: string) {
		expect(field.isEnabled())
			.toEqual(null, name + ' is disabled');
	}
}
