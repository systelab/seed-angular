import { by, element, ElementArrayFinder, promise, protractor } from 'protractor';
import { ButtonState } from './test-toolkit';

declare const allure: any;

export class BasePage {

	protected tagName = '';
	protected tagNameIndex: number;

	protected getAllButtons?(): any;    // this should be implemented ONLY on the child classes that will actually are going to need it

	constructor(dialogTagName: string, dialogTagNameIndex?: number) {
		this.tagName = dialogTagName;
		if (dialogTagNameIndex === undefined) {
			this.tagNameIndex = 0;
		} else {
			this.tagNameIndex = dialogTagNameIndex;
		}
	}

	public getMainWindow() {
		return element.all(by.tagName(this.tagName))
			.get(this.tagNameIndex);
	}

	// TODO: Move to a unique Dialog util
	public getTitle() {
		return this.getMainWindow()
			.element(by.tagName('systelab-dialog-header'))
			.element(by.className('slab-dialog-header'));
	}

	public getButtonClose() {
		return this.getMainWindow()
			.element(by.className('slab-dialog-close'));
	}

	public getObjectById(id: string) {
		return this.getMainWindow()
			.element(by.id(id));
	}

	public searchGridCols(obj: ElementArrayFinder, strTextToSearch: string): promise.Promise<number> {
		let posFound = -1;

		return new promise.Promise((resolve, reject) => {
			obj.each(
				function(elem, index) {
					elem.getText()
						.then(
							(inText) => {
								if (inText.trim()
										.toLowerCase() === strTextToSearch.trim()
										.toLowerCase()) {
									posFound = index;
								}
							}
						);
				}
			)
				.then(
					function() {
						resolve(posFound);
					},
					function(err) {
						reject(err);
					}
				);
		});
	}

	public existButton(buttonText: string): promise.Promise<boolean> {
		buttonText = buttonText.toLowerCase()
			.trim();
		return new promise.Promise((resolve, reject) => {
			let exist = false;

			this.getAllButtons()
				.then((arrButtons) => {
					for (let i = 0; i < arrButtons.length; i++) {
						arrButtons[i].getText()
							.then((inText) => {
								exist = exist || (inText.toLowerCase()
									.trim() === buttonText);
							});
					}
					protractor.promise.controlFlow()
						.execute(function() {
							resolve(exist);
						});
				});
		});
	}

	public getButtonByName(name: string) {
		return this.getMainWindow()
			.element(by.buttonText(name));
	}

	public checkButtons(buttons: ButtonState[]) {
		allure.createStep('Action: Get all the buttons', () => {
		});
		// Apart, check if the enable flag is correct

		buttons.forEach((buttonElem) => {
			this.existButton(buttonElem.name)
				.then((existButton) => {
					allure.createStep(`Button ${buttonElem.name} is present`, () => {
						expect(existButton)
							.toBe(buttonElem.exist, `Button ${buttonElem.name} should be present`);
					})()
				});
		});

		buttons.filter((b) => b.enable)
			.forEach((buttonElem) => {
				this.getButtonByName(buttonElem.name).isEnabled()
					.then((enabled) => {
						allure.createStep(`Button ${buttonElem.name} is enabled`, () => {})()
							expect(enabled)
								.toBe(true);

					});
			});
		buttons.filter((b) => !b.enable)
			.forEach((buttonElem) => {
				this.getButtonByName(buttonElem.name).isEnabled()
					.then((enabled) => {
						allure.createStep(`Button ${buttonElem.name} is disabled`, () => {})()
							expect(enabled)
								.toBe(null);

					});
			});
		this.getAllButtons()
			.count()
			.then((inCount) => {
				allure.createStep(`Buttons count should be equal to ${buttons.filter((b) => b.exist).length}`, () => {
					expect(inCount)
						.toBe(buttons.filter((b) => b.exist).length, 'Buttons count');
				})()
			});

	}
}
