import { by, ElementArrayFinder, ElementFinder } from 'protractor';
import { ContextMenuService } from './context-menu.service';
import { ExpectsUtil } from '../utilities/expects-util';
import { BasePage } from './base-page';
import { TestUtil } from '../utilities/test-util';

declare const allure: any;

export class GridService {
	public static readonly GRID_COLUMN_CONTEXT_MENU = 'contextMenu';
	public static readonly GRID_COLUMN_NAME = 'name';
	public static readonly GRID_DEFAULT_TAG = 'ag-grid-angular';
	public static readonly GRID_DEFAULT_ID = 'agGrid';
	public static readonly GRID_NODATA_MESSAGE = 'No Rows To Show';

	public static getGridComponentById(page: BasePage) {
		return page.getObjectById(this.GRID_DEFAULT_ID);
	}

	public static getGridComponent(myElement: ElementFinder) {
		return myElement
			.element(by.tagName(this.GRID_DEFAULT_TAG));
	}

	public static getGridInnerComponent(grid: ElementFinder, col?: string, row?: number): any {
		if (col === undefined) {
			return grid.element(by.className('ag-center-cols-container'))
				.all(by.css('div[role=row]'));
		} else {
			if (row === undefined) {
				return grid.element(by.className('ag-center-cols-container'))
					.all(by.css('div[col-id="' + col + '"]'));
			} else {
				return grid.element(by.className('ag-center-cols-container'))
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

	public static getCol(grid: ElementFinder, col: number) {
		return grid.all(by.css('div[col-index="' + col + '"] div.ag-cell-value'));
	}

	public static getGridHeaderText(grid: ElementFinder, col: number) {
		return GridService.getGridHeader(grid, col)
			.element(by.className('ag-header-cell-text'))
			.getText();
	}

	public static getNoDataMessage(grid: ElementFinder) {
		return grid.element(by.className('ag-overlay-no-rows-center'));
	}

	public static getNumberOfRows(grid: ElementFinder) {
		return grid.all(by.css('div.ag-body-container div.ag-row'))
			.count();
	}

	public static gridHasData(grid: ElementFinder): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.getNumberOfRows(grid)
				.then((num) => {
					resolve(num > 0);
				}, (err) => {
					reject(false);
				})
				.catch((err) => {
					reject(false);
				});
		});
	}

	public static checkGridHeaders(grid: ElementFinder, titles: string[]) {
		titles.forEach((titleElem, index) => {
		//	TestUtil.checkText(GridService.getGridHeaderText(grid, index), `Column[${index}]: ${titleElem}`, titleElem);
		});
		GridService.gridHasData(grid)
			.then((data) => {
				if (data === true) {
					TestUtil.checkIsPresent(GridService.getRow(grid, 0)
						.get(0), 'a Cell');
				} else {
			//		TestUtil.checkText(GridService.getNoDataMessage(grid), 'NoData_Message', GridService.GRID_NODATA_MESSAGE);
				}
			});
	}
}

