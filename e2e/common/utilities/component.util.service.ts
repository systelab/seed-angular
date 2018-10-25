import { ElementFinder, by, element, promise, protractor } from 'protractor';

// TODO: Move components.util.service to the systelab-components. Split this file into utils for each component
export class ComponentUtilService {
	static tagNameContextualMenu = 'systelab-context-menu-item';
	static classNameDropDown = 'slab-dropdown slab-dropdown-fixed';
	static cssNameCellValue = '.ag-cell-value';
	static cssHeaderCellText = '.ag-header-cell-text';

	static getGridData(gridObject: ElementFinder, col?: string, row?: number): any {
		if (col === undefined) {
			return gridObject.element(by.className('ag-body-viewport'))
				.all(by.css('div[role=row]'));
		} else {
			if (row === undefined) {
				return gridObject.element(by.className('ag-body-viewport'))
					.all(by.css('div[col-id="' + col + '"]'));
			} else {
				return gridObject.element(by.className('ag-body-viewport'))
					.element(by.css('div[row-index="' + row + '"]'))
					.all(by.css('div[col-id="' + col + '"]'));
			}
		}
	}

	static getGridHeaders(gridObject: ElementFinder, col?: number): any {
		if (col === undefined) {
			return gridObject.element(by.className('ag-header-container'))
				.element(by.className('ag-header-row'))
				.all(by.className('ag-header-cell'));
		} else {
			return gridObject.element(by.className('ag-header-container'))
				.element(by.className('ag-header-row'))
				.all(by.className('ag-header-cell'))
				.get(col);
		}
	}

	static getContextMenu(gridObject: ElementFinder, col?: string, row?: number, subIndex?: number) {
		if (subIndex === undefined) {
			return this.getGridData(gridObject, col, row)
				.all(by.tagName(ComponentUtilService.tagNameContextualMenu));
		} else {
			return this.getGridData(gridObject, col, row)
				.all(by.tagName(ComponentUtilService.tagNameContextualMenu))
				.get(subIndex);
		}
	}

	/*static getContextualMenuByRow(mainWindow: ElementFinder) {
	 return mainWindow.all(by.className(ComponentUtilService.classNameDropDown));
	 }

	 static getlistProfileHeaders(windowGrid: ElementFinder) {
	 return windowGrid.all(by.css(ComponentUtilService.cssHeaderCellText));
	 }

	 static getlistCells(windowGrid: ElementFinder) {
	 return windowGrid.all(by.css(ComponentUtilService.cssNameCellValue));
	 }*/

	static isSorted(arr, arr2?) {
		// const limit = arr.length - 1;
		return arr.every(
			function(_, i) {
				let bReturn = true;

				if (i > 0) {
					if (arr2 === undefined) {
						bReturn = arr[i - 1] <= arr[i];
					} else {
						if (arr[i - 1] == arr[i]) {
							bReturn = arr2[i - 1] <= arr2[i];
						} else {
							bReturn = arr[i - 1] < arr[i];
						}
					}
				}
				return bReturn;
			}
		);
	}

	static getCurrentTime() {
		let strReturn: string = "";

		var today = new Date();
		var hh = today.getHours();
		var mm = today.getMinutes();
		var ss = today.getSeconds();

		if (hh < 10) {
			strReturn = '0';
		}
		strReturn += hh + ":";

		if (mm < 10) {
			strReturn += '0';
		}
		strReturn += mm + ":";

		if (ss < 10) {
			strReturn += '0';
		}
		strReturn += ss;

		return strReturn;
	}

	static getCurrentDate() {
		let strReturn: string = "";

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();

		if (dd < 10) {
			strReturn = '0';
		}

		strReturn += dd + "/";
		if (mm < 10) {
			strReturn += '0';
		}

		strReturn += mm + "/" + yyyy;
		return strReturn;
	}

	static isClickable(el: ElementFinder): promise.Promise<boolean> {
		return new promise.Promise(resolve => {
			//let interval = setInterval(() => {
			//console.log("flag 2");
			el.click()
				.then(() => {
					//clearInterval(interval);
					setTimeout(() => {
						//console.log("flag 3");
						resolve(true);
					}, 100);
				}, () => {
					//console.log("flag 4");
					resolve(false);
				});
			//}, 50);
		});
	}
}