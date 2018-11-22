import { by, ElementArrayFinder, ElementFinder } from 'protractor';

export class GridService {
	public static readonly TAG_NAME_CONTEXTUAL_MENU = 'systelab-context-menu-item';

	public static getGridInnerComponent(grid: ElementFinder, col?: string, row?: number): any {
		if (col === undefined) {
			return grid.element(by.className('ag-body-viewport'))
				.all(by.css('div[role=row]'));
		} else {
			if (row === undefined) {
				return grid.element(by.className('ag-body-viewport'))
					.all(by.css('div[col-id="' + col + '"]'));
			} else {
				return grid.element(by.className('ag-body-viewport'))
					.element(by.css('div[row-index="' + row + '"]'))
					.all(by.css('div[col-id="' + col + '"]'));
			}
		}
	}

	public static getGridHeader(grid: ElementFinder, col?: number) {
		if (col === undefined) {
			return grid.element(by.className('ag-header-container'))
				.element(by.className('ag-header-row'))
				.all(by.className('ag-header-cell'));
		} else {
			return grid.element(by.className('ag-header-container'))
				.element(by.className('ag-header-row'))
				.all(by.className('ag-header-cell'))
				.get(col);
		}
	}
}

