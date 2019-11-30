import { TestUtil } from '../utilities/test-util';
import { InputableInterface } from '../widgets/inputable.interface';
import { SystelabDialogTest } from '../widgets/systelab-dialog-test';

declare const allure: any;

export interface FormData {
	field: InputableInterface;
	name: string;
	value: string;
}

export interface ButtonState {
	name: string;
	exist: boolean;
	enable: boolean;
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
				formDataItem.field.setText(formDataItem.value);
				TestUtil.checkText(formDataItem.field.getText(), 'Field "' + formDataItem.name + '" in form "' + name + '" should be ' + formDataItem.value, formDataItem.value, false);
			});
		})();
	}

	public static clearField(widget: InputableInterface) {
		widget.clear();
	}

	public static fillField(widget: InputableInterface, name: string, value: string) {
		allure.createStep('Action: Fill ' + name + ' with value ' + value, () => {
			widget.setText(value);
		})();
	}

	public static checkButtons(page: SystelabDialogTest, buttons: ButtonState[]) {
		allure.createStep('Action: Review the button name and status:' + JSON.stringify(buttons), () => {

			TestUtil.checkNumber(page.getNumberOfButtons(), `Number of buttons`, buttons.filter((b) => b.exist).length);

			buttons.forEach((buttonElem) => {
				TestUtil.checkBoolean(page.getButtonByName(buttonElem.name).isPresent(), `Button ${buttonElem.name} is present`);
			});

			buttons.filter((b) => b.enable)
				.forEach((buttonElem) => {
					TestUtil.checkBoolean(page.getButtonByName(buttonElem.name).isEnabled(), `Button ${buttonElem.name} is enabled`);
				});
			buttons.filter((b) => !b.enable)
				.forEach((buttonElem) => {
					TestUtil.checkBoolean(page.getButtonByName(buttonElem.name).isDisabled(), `Button ${buttonElem.name} is disabled`);
				});
			allure.createStep('The buttons are in the correct status', () => {
			})();
		})();
	}
}

