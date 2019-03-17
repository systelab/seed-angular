import { Component } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { DialogRef, MessagePopupService, ModalComponent, SystelabModalContext } from 'systelab-components/widgets/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientAllergyService } from '@api/patient-allergy.service';
import { PatientAllergy } from '@model/patient-allergy';

export class PatientAllergyDialogParameters extends SystelabModalContext {
	public patientId: string;
	public width = 600;
	public height = 250;
}

@Component({
	selector:    'patient-allergy-dialog',
	templateUrl: 'patient-allergy-dialog.component.html',
})
export class PatientAllergyDialog implements ModalComponent<PatientAllergyDialogParameters> {

	public parameters: PatientAllergyDialogParameters;

	public allergyId: string;
	public allergyName: string;

	public notes: string;

	public assertedDate: Date;
	public lastOccurrenceDate: Date;

	constructor(public dialog: DialogRef<PatientAllergyDialogParameters>, protected i18NService: I18nService,
	            protected messagePopupService: MessagePopupService, protected patientAllergyService: PatientAllergyService) {
		this.parameters = dialog.context;
	}

	public static getParameters(): PatientAllergyDialogParameters {
		return new PatientAllergyDialogParameters();
	}

	public close(): void {
		this.dialog.close(false);
	}

	public doPerformAction() {
		let patientAllergy: PatientAllergy = {
			'allergy':        {'id': this.allergyId, 'name': this.allergyName},
			'lastOccurrence': this.lastOccurrenceDate,
			'assertedDate':   this.assertedDate,
			'note':           this.notes
		};
		this.addAllergyToPatient(patientAllergy);
	}

	private addAllergyToPatient(patientAllergy: PatientAllergy) {
		this.patientAllergyService.addAllergyToPatient(this.parameters.patientId, patientAllergy)
			.subscribe((result) => {
					this.dialog.close(true);
				},
				(error) => this.showError(error));
	}

	private showError(error: HttpErrorResponse) {
		this.i18NService.get(['ERR_ERROR'])
			.subscribe((res) => {
				console.log(error);
				this.messagePopupService.showErrorPopup(res.ERR_ERROR, error.message);
			});
	}

}
