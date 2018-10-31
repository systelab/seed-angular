import { by, ElementArrayFinder, ElementFinder, promise } from 'protractor';

// TODO: Split this file into utils for each component
export class ComponentUtilService {
	public static readonly TAG_NAME_CONTEXTUAL_MENU = 'systelab-context-menu-item';
	public static readonly CLASS_NAME_DROPDOWN = 'slab-dropdown slab-dropdown-fixed';
	public static readonly CSS_NAME_CELL_VALUE = '.ag-cell-value';
	public static readonly CSS_HEADER_CELL_TEXT = '.ag-header-cell-text';

	public static getGridInnerComponent(grid: ElementFinder, col?: string, row?: number): any {
		if (col === undefined) {
			return grid.element(by.className('ag-body-viewport')).all(by.css('div[role=row]'));
		} else {
			if (row === undefined) {
				return grid.element(by.className('ag-body-viewport')).all(by.css('div[col-id="' + col + '"]'));
			} else {
				return grid.element(by.className('ag-body-viewport')).element(by.css('div[row-index="' + row + '"]')).all(by.css('div[col-id="' + col + '"]'));
			}
		}
	}

	public static getGridHeader(grid: ElementFinder, col?: number) {
		if (col === undefined) {
			return grid.element(by.className('ag-header-container')).element(by.className('ag-header-row')).all(by.className('ag-header-cell'));
		} else {
			return grid.element(by.className('ag-header-container')).element(by.className('ag-header-row')).all(by.className('ag-header-cell')).get(col);
		}
	}

	public static getContextMenu(gridObject: ElementFinder, col?: string, row?: number, subIndex?: number) {
		if (subIndex === undefined) {
			return this.getGridInnerComponent(gridObject, col, row).all(by.tagName(ComponentUtilService.TAG_NAME_CONTEXTUAL_MENU));
		} else {
			return this.getGridInnerComponent(gridObject, col, row).all(by.tagName(ComponentUtilService.TAG_NAME_CONTEXTUAL_MENU)).get(subIndex);
		}
	}

	public searchGridCols(obj: ElementArrayFinder, strTextToSearch: string): promise.Promise<number> {
		let posFound = -1;

		return new promise.Promise((resolve, reject) => {
			obj.each(
				(elem, index) => {
					elem.getText()
						.then(
							(inText) => {
								if (inText.trim() === strTextToSearch.trim()) {
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

	/*static getContextualMenuByRow(mainWindow: ElementFinder) {
	 return mainWindow.all(by.className(ComponentUtilService.CLASS_NAME_DROPDOWN));
	 }

	 static getlistProfileHeaders(windowGrid: ElementFinder) {
	 return windowGrid.all(by.css(ComponentUtilService.CSS_HEADER_CELL_TEXT));
	 }

	 static getlistCells(windowGrid: ElementFinder) {
	 return windowGrid.all(by.css(ComponentUtilService.CSS_NAME_CELL_VALUE));
	 }*/

}
