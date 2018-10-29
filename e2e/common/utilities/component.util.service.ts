import { by, ElementFinder } from 'protractor';

// TODO: Split this file into utils for each component
export class ComponentUtilService {
	public static readonly TAG_NAME_CONTEXTUAL_MENU = 'systelab-context-menu-item';
	public static readonly CLASS_NAME_DROPDOWN = 'slab-dropdown slab-dropdown-fixed';
	public static readonly CSS_NAME_CELL_VALUE = '.ag-cell-value';
	public static readonly CSS_HEADER_CELL_TEXT = '.ag-header-cell-text';

	public static getGridData(gridObject: ElementFinder, col?: string, row?: number): any {
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

	public static getGridHeader(gridObject: ElementFinder, col?: number) {
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

	public static getContextMenu(gridObject: ElementFinder, col?: string, row?: number, subIndex?: number) {
		if (subIndex === undefined) {
			return this.getGridData(gridObject, col, row)
				.all(by.tagName(ComponentUtilService.TAG_NAME_CONTEXTUAL_MENU));
		} else {
			return this.getGridData(gridObject, col, row)
				.all(by.tagName(ComponentUtilService.TAG_NAME_CONTEXTUAL_MENU))
				.get(subIndex);
		}
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
