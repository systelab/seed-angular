import { by } from 'protractor';
import { BasePage } from '../common/components/base-page';

export class PatientMaintenancePage extends BasePage {

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
