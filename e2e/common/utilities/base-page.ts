import { by, element, ElementArrayFinder, promise, protractor } from 'protractor';

export class BasePage {

	public static readonly NOT_RETRIEVED = '<not retrieved yet, available after calling navigateToHomePage()>';

	protected tagName = '';
	protected tagNameIndex: number;

	public getAllButtons?(): any;    // this should be implemented ONLY on the child classes that will actually are going to need it

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
				(elem, index) => {
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
					() => {
						resolve(posFound);
					},
					(err) => {
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
						.execute(() => {
							resolve(exist);
						});
				});
		});
	}

	public getButtonByName(name: string) {
		return this.getMainWindow()
			.element(by.buttonText(name));
	}

}
