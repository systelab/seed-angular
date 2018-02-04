import { by, element } from 'protractor';

export class PatientListPage {

	getTableHeaderCells() {
		return element.all(by.css('.ag-header-cell-text'));
	}

	getRow(n: number) {
		return element.all(by.css('div[row-index="' + n + '"] div.ag-cell-value'))
	}

	getNumberOfRows() {
		return element.all(by.css('.ag-body-container div.ag-row')).count();
	}

	getRows() {
		return element.all(by.css('.ag-body-container div.ag-row'));
	}

	clickRow(n: number) {
		return element.all(by.css('div[row-index="' + n + '"] div.ag-cell-value')).get(1).click();
	}

	getOptionsButton() {
		return element(by.buttonText('Options'));
	}

	getAddButton() {
		return element(by.buttonText('Add'));
	}

	getRefreshButton() {
		return element(by.buttonText('Refresh'));
	}

	getCellWithValue(searchText: string) {
		return element(by.cssContainingText('.ag-cell', searchText));
	}
}
