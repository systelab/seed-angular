import { by, element, ElementFinder, ElementArrayFinder, promise, protractor } from 'protractor';
// import {Promise} from 'es6-promise';

export abstract class MainDialogUtil {
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

	protected _mainWindow() {
		return element.all(by.tagName(this.tagName))
			.get(this.tagNameIndex);
	}

	public getMainWindow() {
		return this._mainWindow();
	}

	//TODO: Move to a unique Dialog util
	getTitle() {
		return this.getMainWindow()
			.element(by.tagName('systelab-dialog-header'))
			.element(by.className('slab-dialog-header'));
	}

	getbtnClose() {
		return this.getMainWindow()
			.element(by.className('slab-dialog-close'));
	}

	getObjectById(id: string) {
		return this.getMainWindow()
			.element(by.id(id));
	}

	searchGridCols(obj: ElementArrayFinder, strTextToSearch: string): promise.Promise<number> {
		let posFound = -1;

		return new promise.Promise((resolve, reject) => {
			obj.each(
				function(elem, index) {
					elem.getText()
						.then(
							function(inText) {
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

	existButton(buttonText: string): promise.Promise<boolean> {
		buttonText = buttonText.toLowerCase()
			.trim();
		return new promise.Promise((resolve, reject) => {
			let exist = false;

			this.getAllButtons()
				.then(function(arrButtons) {
					for (let i = 0; i < arrButtons.length; i++) {
						arrButtons[i].getText()
							.then(function(inText) {
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
}
