import { by } from 'protractor';
import { BasePage } from '../common/components/base-page';
import { ButtonState } from '../common/components/button.service';

export class PatientMaintenancePage extends BasePage {

	public title = 'Patient management';
	public buttons: ButtonState[] = [{
		name:   'Options',
		exist:  true,
		enable: true
	}, {
		name:   'Add',
		exist:  true,
		enable: true
	}, {
		name:   'Refresh',
		exist:  true,
		enable: true
	}];

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

	public getPatientsGrid() {
		return this.getObjectById('PatientTable');
	}
}
