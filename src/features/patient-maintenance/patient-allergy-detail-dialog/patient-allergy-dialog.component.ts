import { Component, OnInit } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { DialogRef, DialogService, MessagePopupService, ModalComponent, SystelabModalContext } from 'systelab-components/widgets/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientAllergyService } from '@api/patient-allergy.service';
import { PatientAllergy } from '@model/patient-allergy';

export class PatientAllergyDialogParameters extends SystelabModalContext {
	public patientId: string;
	public patientAllergy: PatientAllergy;
	public width = 600;
	public height = 340;
}

@Component({
	selector:    'patient-allergy-dialog',
	templateUrl: 'patient-allergy-dialog.component.html',
})
export class PatientAllergyDialog implements ModalComponent<PatientAllergyDialogParameters>, OnInit {

	public parameters: PatientAllergyDialogParameters;
	public title = '';
	public humanReadableAction = '';

	public allergyId: string;
	public allergyName: string;

	public notes: string;

	public assertedDate: Date;
	public lastOccurrenceDate: Date;

	constructor(public dialog: DialogRef<PatientAllergyDialogParameters>, protected i18NService: I18nService, protected dialogService: DialogService,
	            protected messagePopupService: MessagePopupService, protected patientAllergyService: PatientAllergyService) {
		this.parameters = dialog.context;
		if (this.isUpdate()) {
			i18NService.get(['COMMON_UPDATE', 'COMMON_UPDATE_PATIENTALLERGY'])
				.subscribe((res) => {
					this.humanReadableAction = res.COMMON_UPDATE;
					this.title = res.COMMON_UPDATE_PATIENT;
				});
		} else {
			i18NService.get(['COMMON_CREATE', 'COMMON_CREATE_PATIENTALLERGY'])
				.subscribe((res) => {
					this.humanReadableAction = res.COMMON_CREATE;
					this.title = res.COMMON_CREATE_PATIENT;
				});

		}
	}

	public static getParameters(): PatientAllergyDialogParameters {
		return new PatientAllergyDialogParameters();
	}

	public ngOnInit() {
		if (this.isUpdate()) {
			this.allergyId = this.parameters.patientAllergy.allergy.id;
			this.allergyName = this.parameters.patientAllergy.allergy.name;
			this.notes = this.parameters.patientAllergy.note;
			this.assertedDate = this.parameters.patientAllergy.assertedDate;
			this.lastOccurrenceDate = this.parameters.patientAllergy.lastOccurrence;
		}
	}

	public close(): void {
		this.dialog.close(false);
	}

	public isUpdate() {
		return this.parameters.patientAllergy;
	}

	public doPerformAction() {
		let patientAllergy: PatientAllergy = {
			'allergy':        {'id': this.allergyId, 'name': this.allergyName},
			'lastOccurrence': this.lastOccurrenceDate,
			'assertedDate':   this.assertedDate,
			'note':           this.notes
		};

		if (this.isUpdate()) {
			this.updatePatientAllergy(patientAllergy);
		} else {
			this.createPatientAllergy(patientAllergy);
		}
	}

	private createPatientAllergy(patientAllergy: PatientAllergy) {
		this.patientAllergyService.addAllergyToPatient(this.parameters.patientId, patientAllergy)
			.subscribe((result) => {
					this.dialog.close(true);
				},
				(error) => this.showError(error));
	}

	private updatePatientAllergy(patientAllergy: PatientAllergy) {
		this.patientAllergyService.updateAllergyFromPatient(this.parameters.patientId, patientAllergy.allergy.id, patientAllergy)
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
