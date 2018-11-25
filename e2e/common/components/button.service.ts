import { ExpectsUtil } from '../utilities/expects-util';
import { BasePage } from './base-page';
declare const allure: any;

export interface ButtonState {
	name: string;
	exist: boolean;
	enable: boolean;
}

export class ButtonService {

	public static checkButtons(page: BasePage, buttons: ButtonState[]) {
		allure.createStep('Action: Review the button name and status:' + JSON.stringify(buttons), () => {

			ExpectsUtil.checkCount(page.getAllButtons(), `Number of buttons`, buttons.filter((b) => b.exist).length);

			buttons.forEach((buttonElem) => {
				ExpectsUtil.checkIsPresent(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
			});

			buttons.filter((b) => b.enable)
				.forEach((buttonElem) => {
					ExpectsUtil.checkIsEnabled(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
				});
			buttons.filter((b) => !b.enable)
				.forEach((buttonElem) => {
					ExpectsUtil.checkIsDisabled(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
				});
			allure.createStep('The buttons are in the correct status', () => {
			})();
		})();
	}
}

