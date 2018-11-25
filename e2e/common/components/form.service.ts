import { ElementFinder } from 'protractor';
declare const allure: any;

export interface FormData {
	field: ElementFinder;
	name: string;
	value: string;
}

export class FormService {

	public static removeValuesInForm(formData: FormData[], name: string) {
		allure.createStep('Action: Remove all values in form ' + name, () => {
			formData.forEach((formDataItem) => {
				this.clearField(formDataItem.field);
			});
		})();
	}

	public static fillForm(formData: FormData[], name: string) {
		allure.createStep('Action: Fill form ' + name, () => {
			formData.forEach((formDataItem) => {
				formDataItem.field.sendKeys(formDataItem.value);
				expect(formDataItem.field.getAttribute('value'))
					.toEqual(formDataItem.value, 'Field "' + formDataItem.name + '" in form "' + name + '" should be ' + formDataItem.value);
			});
		})();
	}

	public static clearField(field: ElementFinder) {
		field.clear();
	}

	public static fillField(field: ElementFinder, name: string, value: string) {
		allure.createStep('Action: Fill ' + name + ' with value ' + value, () => {
			field.sendKeys(value);
		})();
	}
}

