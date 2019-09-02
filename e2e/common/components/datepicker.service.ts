import { by, ElementFinder } from 'protractor';

/* tslint:disable:no-any */
declare const allure: any;

/* tslint:enable:no-any */

export class DatepickerService {

	public static getInput(myElement: ElementFinder) {
		return myElement.element(by.tagName('input'));
	}

}
