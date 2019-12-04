import { by, element } from 'protractor';
import { PatientDialog } from './patient-detail/patient-dialog';
import { Button, Grid, SystelabDialogTest } from 'systelab-components-test';
import { FormButtonElement } from 'systelab-components-test/lib/services';

export class PatientMaintenanceDialog extends SystelabDialogTest {

	public title = 'Patient management';
	public buttons: FormButtonElement[] = [{
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
	public patientGridHeaderTitles = ['', 'Name', 'Surname', 'Email'];
	public patientGridMenuItems = ['Update', 'Delete'];

	public getButtonOptions(): Button {
		return new Button(this.byId('PatientMaintenanceOptionsButton'));
	}

	public getButtonAdd(): Button {
		return new Button(this.byId('PatientMaintenanceAddButton'));
	}

	public getButtonRefresh(): Button {
		return new Button(this.byId('PatientMaintenanceRefreshButton'));
	}

	public getPatientsGrid(): Grid {
		return new Grid(this.byId('PatientTable'));
	}

	public getPatientDialog(): PatientDialog {
		return new PatientDialog(element(by.tagName('patient-dialog')));
	}

}
