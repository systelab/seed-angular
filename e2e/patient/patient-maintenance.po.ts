import { by } from 'protractor';
import { BasePage } from '../common/utilities/base-page';

export class PatientMaintenancePage extends BasePage {
	public static readonly GRID_COLUMN_CONTEXT_MENU = 'contextMenu';
	public static readonly GRID_COLUMN_NAME = 'name';
	public static readonly GRID_COLUMN_SURNAME = 'surname';
	public static readonly GRID_COLUMN_EMAIL = 'email';

	constructor() {
		super('patient-maintenance-dialog');
	}

	public getAllButtons() {
		return this.getMainWindow()
			.element(by.tagName('systelab-dialog-bottom'))
			.all(by.tagName('button'));
	}

	public getButtonOptions() {
		return this.getObjectById('PatientMaintenanceOptionsButton');
	}

	public getButtonAdd() {
		return this.getObjectById('PatientMaintenanceAddButton');
	}

	public getButtonRefresh() {
		return this.getObjectById('PatientMaintenanceRefreshButton');
	}

	getPatientsGrid() {
		return this.getObjectById('PatientTable');
	}
}
