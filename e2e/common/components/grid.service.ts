import { by, ElementFinder } from 'protractor';
import { ContextMenuService } from './context-menu.service';
import { ExpectsUtil } from '../utilities/expects-util';

declare const allure: any;

export class GridService {
	public static readonly GRID_COLUMN_CONTEXT_MENU = 'contextMenu';
	public static readonly GRID_COLUMN_NAME = 'name';

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

	public static checkGridPopupMenuContentAtRow(element: ElementFinder, row: number, menuitems: string[]) {
		GridService.getGridInnerComponent(element, this.GRID_COLUMN_CONTEXT_MENU, row)
			.click();
		ExpectsUtil.checkMenuOptions(ContextMenuService.getContextMenu(element), menuitems);
		// Click outside to hide context menu
		GridService.getGridHeader(element)
			.click();
		allure.createStep('The menu buttons are in the correct status', () => {
		})();
	}

	public static clickGridPopupMenuContentAtRow(element: ElementFinder, row: number, option: number) {
		GridService.getGridInnerComponent(element, this.GRID_COLUMN_CONTEXT_MENU, row)
			.click();
		ContextMenuService.getContextMenu(element, option)
			.click();
	}

	public static clickOnCell(element: ElementFinder, row: number, colName?: string) {
		GridService.getGridInnerComponent(element, this.GRID_COLUMN_NAME, row)
			.click();
	}

	public static getRow(grid: ElementFinder, row: number) {
		return grid.all(by.css('div[row-index="' + row + '"] div.ag-cell-value'));

	}
}

