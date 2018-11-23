import { by, ElementFinder } from 'protractor';
import { PatientMaintenancePage } from '../../patient/patient-maintenance.po';
import { TestUtil } from '../utilities/test-util';
import { ContextMenuService } from './context-menu.service';

export class GridService {
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
		GridService.getGridInnerComponent(element, PatientMaintenancePage.GRID_COLUMN_CONTEXT_MENU, row).click();
		TestUtil.checkMenuOptions(ContextMenuService.getContextMenu(element), menuitems);
		// Click outside to hide context menu
		GridService.getGridHeader(element).click();
	}

	public static clickGridPopupMenuContentAtRow(element: ElementFinder, row: number, option: number) {
		GridService.getGridInnerComponent(element, PatientMaintenancePage.GRID_COLUMN_CONTEXT_MENU, row).click();
		ContextMenuService.getContextMenu(element, option).click();
	}

	public static clickOnCell(element: ElementFinder, row: number, colName?: string) {
		GridService.getGridInnerComponent(element, PatientMaintenancePage.GRID_COLUMN_NAME, row).click();
	}
}

