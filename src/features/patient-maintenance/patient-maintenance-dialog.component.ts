import { Component, ViewChild } from '@angular/core';
import { PatientService } from '@api/patient.service';
import { DialogRef, DialogService, ModalComponent, SystelabModalContext } from 'systelab-components/widgets/modal';
import { PatientDialog, PatientDialogParameters } from './patient-detail-dialog/patient-dialog.component';

import { GridContextMenuActionData } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-action-data';
import { Patient } from '@model/patient';
import { GridContextMenuOption } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-option';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PatientGrid } from '@components/patient/grid/patient-grid.component';

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

	 @ViewChild('patientgrid') public patientgrid: PatientGrid;

	public title = '';

	constructor(public dialog: DialogRef<PatientMaintenanceDialogParameters>, protected dialogService: DialogService, protected patientService: PatientService, protected i18nService: I18nService) {
		this.parameters = dialog.context;
		i18nService.get('COMMON_PATIENT_MANAGEMENT').subscribe((res) => {
			this.title = res;
		});

	}

	public close(): void {
		this.dialog.close(false);
	}

	public static getParameters(): PatientMaintenanceDialogParameters {
		return new PatientMaintenanceDialogParameters();
	}

	public doCreatePatient() {
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
		const menuDefs: Array<GridContextMenuOption<Patient>> = [];
		this.i18nService.get(['COMMON_UPDATE', 'COMMON_DELETE']).subscribe((res) => {
			menuDefs.push(new GridContextMenuOption('action1', res.COMMON_UPDATE), new GridContextMenuOption('action2', res.COMMON_DELETE));
		});
		return menuDefs;
	}

	public doMenuAction(contextMenuActionData: GridContextMenuActionData<Patient>) {
		if (contextMenuActionData.actionId === 'action1') {
			this.updatePatient(contextMenuActionData);
		} else if (contextMenuActionData.actionId === 'action2') {
			this.deletePatient(contextMenuActionData);
		}
	}

	private updatePatient(contextMenuActionData: GridContextMenuActionData<Patient>) {
		this.doSelect(contextMenuActionData.data);
	}

	private deletePatient(contextMenuActionData: GridContextMenuActionData<Patient>) {
		this.patientService.remove(contextMenuActionData.data.id)
			.subscribe(result => this.patientgrid.refresh(), error => console.log('error'));
	}
}
