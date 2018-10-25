import { by, element } from 'protractor';
import { MainDialogUtil }       from '../common/utilities/main-dialog.util';

export class PatientManagementPage extends MainDialogUtil {
    public GRID_COLUMN_CONTEXTMENU = 'contextMenu';
    public GRID_COLUMN_NAME        = 'name';
    public GRID_COLUMN_SURNAME     = 'surname';
    public GRID_COLUMN_EMAIL       = 'email';

	constructor() {
		super('patient-maintenance-dialog');
	}

	public getAllButtons() {
		return this.getMainWindow().element(by.tagName('systelab-dialog-bottom')).all(by.tagName('button'));
	}

    getbtnOptions() {
		return this.getObjectById('PatientMaintenanceOptionsButton');
	}

    getbtnAdd() {
        return this.getObjectById('PatientMaintenanceAddButton');
    }

	getbtnRefresh() {
        return this.getObjectById('PatientMaintenanceRefreshButton');
	}

    /*getPatientsData(col?: string, row?: number): any {
        if (col === undefined) {
            return this.getPatientsGrid().element(by.className('ag-body-viewport')).all(by.css('div[role=row]'));
        } else {
            if (row === undefined) {
                return this.getPatientsGrid().element(by.className('ag-body-viewport')).all(by.css('div[col-id="' + col + '"]'));
            } else {
                return this.getPatientsGrid().element(by.className('ag-body-viewport')).all(by.css('div[row-index="' + row + '"]')).get(0).element(by.css('div[col-id="' + col + '"]'));
            }
        }
    }*/

    getPatientsGrid() {
        return this.getObjectById('PatientTable');
    }

	/*getPatientsHeaders(col?: number): any {
		if (col === undefined) {
			return this.getPatientsData().element(by.className('ag-header-container')).element(by.className('ag-header-row')).all(by.className('ag-header-cell'));
		} else {
			return this.getPatientsData().element(by.className('ag-header-container')).element(by.className('ag-header-row')).all(by.className('ag-header-cell')).get(col);
		}
	}*/
}
