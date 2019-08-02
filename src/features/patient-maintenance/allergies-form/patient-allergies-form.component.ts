import { Component, Input, ViewChild } from '@angular/core';
import { PatientAllergyGrid } from '../../../common/components/patient-allergy/grid/patient-allergy-grid.component';
import { PatientAllergyDialog, PatientAllergyDialogParameters } from '@features/patient-maintenance/patient-allergy-detail-dialog/patient-allergy-dialog.component';
import { DialogService } from 'systelab-components/widgets/modal';
import { GridContextMenuOption } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-option';
import { GridContextMenuActionData } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-action-data';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PatientAllergy } from '@model/patient-allergy';
import { PatientAllergyService } from '@api/patient-allergy.service';
import { ErrorService } from '@globals/error.service';

@Component({
	selector:    'patient-allergies-form',
	templateUrl: './patient-allergies-form.component.html'
})
export class PatientAllergiesFormComponent {

	@Input() public patientId: string;

	@ViewChild('grid', {static: false}) public grid: PatientAllergyGrid;

	constructor(protected dialogService: DialogService, protected patientAllergyService: PatientAllergyService,
	            protected i18nService: I18nService, protected errorService: ErrorService) {
	}

	public doShowOptions() {
		this.grid.showOptions();
	}

	public doSelect(patientAllergy: PatientAllergy): void {
		const parameters: PatientAllergyDialogParameters = PatientAllergyDialog.getParameters();
		parameters.patientId = this.patientId;
		parameters.patientAllergy = patientAllergy;

		this.dialogService.showDialog(PatientAllergyDialog, parameters)
			.subscribe(
				(result) => {
					if (result) {
						this.grid.refresh();
					}
				}
			);
	}

	public getMenu(): Array<GridContextMenuOption<PatientAllergy>> {
		const menuDefs: Array<GridContextMenuOption<PatientAllergy>> = [];
		this.i18nService.get(['COMMON_UPDATE', 'COMMON_DELETE']).subscribe((res) => {
			menuDefs.push(new GridContextMenuOption('action1', res.COMMON_UPDATE), new GridContextMenuOption('action2', res.COMMON_DELETE));
		});
		return menuDefs;
	}

	public doMenuAction(contextMenuActionData: GridContextMenuActionData<PatientAllergy>) {
		if (contextMenuActionData.actionId === 'action1') {
			this.updatePatientAllergy(contextMenuActionData);
		} else if (contextMenuActionData.actionId === 'action2') {
			this.deletePatientAllergy(contextMenuActionData);
		}
	}

	public doAddAllergy() {
		const parameters: PatientAllergyDialogParameters = PatientAllergyDialog.getParameters();
		parameters.patientId = this.patientId;
		this.dialogService.showDialog(PatientAllergyDialog, parameters)
			.subscribe((result) => {
				if (result) {
					this.grid.refresh();
				}
			});
	}

	private updatePatientAllergy(contextMenuActionData: GridContextMenuActionData<PatientAllergy>) {
		this.doSelect(contextMenuActionData.data);
	}

	private deletePatientAllergy(contextMenuActionData: GridContextMenuActionData<PatientAllergy>) {
		this.patientAllergyService.deleteAllergiesFromPatient(this.patientId, contextMenuActionData.data.allergy.id)
			.subscribe(result => this.grid.refresh(), error => this.errorService.showError(error));
	}
}
