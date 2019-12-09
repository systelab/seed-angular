import {by, element} from 'protractor';
import {PatientDialog} from './patient-detail/patient-dialog';
import {Button, Grid, SystelabDialogTest} from 'systelab-components-test';

export class PatientMaintenanceDialog extends SystelabDialogTest {

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
