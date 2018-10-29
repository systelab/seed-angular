import { browser, ElementFinder, ExpectedConditions as EC, promise } from 'protractor';
import { BasePage } from './base-page';
import { TestUtil } from './test-util';
import { JSConsole } from './js-console';

declare const allure: any;

export interface ButtonState {
	name: string;
	exist: boolean;
	enable: boolean;
}

export class TestToolkit {

	private static console = new JSConsole();

	public static readonly TIME_OUT_MS_FOR_DIALOG_WINDOW = 30000;

	public static showNewPageAndCheckTitleAndButtons(newPage: BasePage, expectedWindowTitle: string, buttons?: ButtonState[]) {

		browser.wait(EC.presenceOf(newPage.getMainWindow()), TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Dialog Window is taking too long to appear in the DOM (timeout: ' + TestToolkit.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
		TestToolkit.checkPresentAndDisplayed(newPage);

		allure.createStep('The title is valid', () => {
		});
		newPage.getTitle()
			.getText()
			.then((s) => {
				TestUtil.checkString(s.toLowerCase(), 'Window title', expectedWindowTitle);
			});

		if (buttons) {
			allure.createStep('The buttons are valid', () => {
			});
			this.checkButtons(newPage, buttons);
		}
	}

	public static checkPresentAndDisplayed(page: BasePage) {
		expect(page.getMainWindow()
			.isPresent())
			.toBe(true, 'Window should be present on the DOM');

		expect(page.getMainWindow()
			.isDisplayed())
			.toBe(true, 'Window should be displayed');
	}

	public static fillField(field: ElementFinder, name: string, value: string) {
		allure.createStep('Action: Fill "' + name + '"', () => {
			field
				.sendKeys(value)
				.then(() => {
					allure.createStep('"' + name + '" has the filled value', () => {
						field
							.getAttribute('value')
							.then((inValue) => {
								expect(inValue)
									.toBe(value, 'Field "' + name + '" was not properly filled');
							});
					})()
				});
		})();
	}

	public static checkButtons(page: BasePage, buttons: ButtonState[]) {
		allure.createStep('Action: Get all the buttons', () => {
		});
		// Apart, check if the enable flag is correct

		buttons.forEach((buttonElem) => {
			page.existButton(buttonElem.name)
				.then((existButton) => {
					allure.createStep(`Button ${buttonElem.name} is present`, () => {
						expect(existButton)
							.toBe(buttonElem.exist, `Button ${buttonElem.name} should be present`);
					})()
				});
		});

		buttons.filter((b) => b.enable)
			.forEach((buttonElem) => {
				page.getButtonByName(buttonElem.name)
					.isEnabled()
					.then((enabled) => {
						allure.createStep(`Button ${buttonElem.name} is enabled`, () => {
						})()
						expect(enabled)
							.toBe(true);

					});
			});
		buttons.filter((b) => !b.enable)
			.forEach((buttonElem) => {
				page.getButtonByName(buttonElem.name)
					.isEnabled()
					.then((enabled) => {
						allure.createStep(`Button ${buttonElem.name} is disabled`, () => {
						})()
						expect(enabled)
							.toBe(null);

					});
			});
		page.getAllButtons()
			.count()
			.then((inCount) => {
				allure.createStep(`Buttons count should be equal to ${buttons.filter((b) => b.exist).length}`, () => {
					expect(inCount)
						.toBe(buttons.filter((b) => b.exist).length, 'Buttons count');
				})()
			});

	}

	public static clearConsole() {
		return this.console.clear();
	}

	public static hasErrorsInConsole() {
		return this.console.hasErrors();
	}

	public static getCurrentTime() {
		let strReturn = '';

		const today = new Date();
		const hh = today.getHours();
		const mm = today.getMinutes();
		const ss = today.getSeconds();

		if (hh < 10) {
			strReturn = '0';
		}
		strReturn += hh + ':';

		if (mm < 10) {
			strReturn += '0';
		}
		strReturn += mm + ':';

		if (ss < 10) {
			strReturn += '0';
		}
		strReturn += ss;

		return strReturn;
	}

	public static getCurrentDate() {
		let strReturn = '';

		const today = new Date();
		const dd = today.getDate();
		const mm = today.getMonth() + 1; // January is 0!
		const yyyy = today.getFullYear();

		if (dd < 10) {
			strReturn = '0';
		}

		strReturn += dd + '/';
		if (mm < 10) {
			strReturn += '0';
		}

		strReturn += mm + '/' + yyyy;
		return strReturn;
	}

	public static isClickable(el: ElementFinder): promise.Promise<boolean> {
		return new promise.Promise(resolve => {
			// let interval = setInterval(() => {
			// console.log("flag 2");
			el.click()
				.then(() => {
					// clearInterval(interval);
					setTimeout(() => {
						// console.log("flag 3");
						resolve(true);
					}, 100);
				}, () => {
					// console.log("flag 4");
					resolve(false);
				});
			// }, 50);
		});
	}
}
