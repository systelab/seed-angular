import { by } from 'protractor';
import { BasePage } from '../base-page';
import { Button, Grid } from '../../widgets';
import { ButtonState } from '../../services/form.service';

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

	public getButtonOptions(): Button {
		return new Button(this.getObjectById('PatientMaintenanceOptionsButton'));
	}

	public getButtonAdd(): Button {
		return new Button(this.getObjectById('PatientMaintenanceAddButton'));
	}

	public getButtonRefresh(): Button {
		return new Button(this.getObjectById('PatientMaintenanceRefreshButton'));
	}

	public getPatientsGrid(): Grid {
		return new Grid(this.getObjectById('PatientTable'));
	}
}
