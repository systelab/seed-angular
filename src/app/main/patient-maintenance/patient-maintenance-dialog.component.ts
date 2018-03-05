import { Component, ViewChild } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PatientService } from '../../common/api/patient.service';
import { DialogRef, DialogService, ModalComponent, SystelabModalContext } from 'systelab-components/widgets/modal';
import { PatientDialog, PatientDialogParameters } from './patient-details-dialog/patient-dialog.component';
import { PatientGrid } from './patient-grid.component';
import { GridContextMenuActionData } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-action-data';
import { Patient } from '../../common/model/patient';
import { GridContextMenuOption } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-option';

export class PatientMaintenanceDialogParameters extends SystelabModalContext {
	public width = 900;
	public height = 550;
}

@Component({
	selector:    'patient-maintenance-dialog',
	templateUrl: 'patient-maintenance-dialog.component.html',
})
export class PatientMaintenanceDialog implements ModalComponent<PatientMaintenanceDialogParameters> {

	public parameters: PatientMaintenanceDialogParameters;

	@ViewChild('patientgrid') patientgrid: PatientGrid;

	public title = 'Patient management';

	constructor(public dialog: DialogRef<PatientMaintenanceDialogParameters>,
	            protected dialogService: DialogService, protected i18nService: I18nService,
	            protected patientService: PatientService) {
		this.parameters = dialog.context;
	}

	public close(): void {
		this.dialog.close(false);
	}

	public static getParameters(): PatientMaintenanceDialogParameters {
		return new PatientMaintenanceDialogParameters();
	}

	public createPatient() {
		const parameters: PatientDialogParameters = PatientDialog.getParameters();
		this.dialogService.showDialog(PatientDialog, parameters)
			.subscribe(
				(result) => {
					if (result) {
						this.patientgrid.refresh();
					}
				}
			);
	}

	public updatePatient(contextMenuActionData: GridContextMenuActionData<Patient>) {
		this.doSelect(contextMenuActionData.data);
	}

	public deletePatient(contextMenuActionData: GridContextMenuActionData<Patient>) {
		this.patientService.remove(contextMenuActionData.data.id)
			.subscribe(
				(result) => console.log('deleted'),
				(error) => console.log('error')
			);
	}

	public doSelect(patient: Patient): void {
		const parameters: PatientDialogParameters = PatientDialog.getParameters();
		parameters.patientId = patient.id;

		this.dialogService.showDialog(PatientDialog, parameters)
			.subscribe(
				(result) => {
					if (result) {
						this.patientgrid.refresh();
					}
				}
			);
	}

	public getMenu(): Array<GridContextMenuOption<Patient>> {
		return [
			new GridContextMenuOption('action1', 'Update'),
			new GridContextMenuOption('action2', 'Delete')
		];
	}

	public doMenuAction(contextMenuActionData: GridContextMenuActionData<Patient>) {
		if (contextMenuActionData.actionId === 'action1') {
			this.updatePatient(contextMenuActionData);
		} else if (contextMenuActionData.actionId === 'action2') {
			this.deletePatient(contextMenuActionData);
		}
	}
}
