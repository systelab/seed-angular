import { by } from 'protractor';
import { BasePage } from '../common/components/base-page';
import { ButtonState } from '../common/components/button.service';
import { Button } from '../common/components/button-test';
import { Grid } from '../common/components/grid-test';

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
		return this.current
			.element(by.tagName('systelab-dialog-bottom'))
			.all(by.tagName('button'));
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
