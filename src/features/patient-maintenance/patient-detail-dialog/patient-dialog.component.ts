import { Component, OnInit, ViewChild } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PatientService } from '@api/patient.service';
import { Patient } from '@model/patient';
import { DialogRef, ModalComponent, SystelabModalContext } from 'systelab-components/widgets/modal';
import { PatientAllergiesFormComponent } from '@features/patient-maintenance/allergies-form/patient-allergies-form.component';
import { ErrorService } from '@globals/error.service';

export class PatientDialogParameters extends SystelabModalContext {
	public patientId: string;
	public width = 710;
	public height = 460;
}

@Component({
	selector:    'patient-dialog',
	templateUrl: 'patient-dialog.component.html',
})
export class PatientDialog implements ModalComponent<PatientDialogParameters>, OnInit {

	public parameters: PatientDialogParameters;
	public title = '';
	public humanReadableAction = '';
	public selectedTab = '';

	@ViewChild('allergies') public allergies: PatientAllergiesFormComponent;

	public patient: Patient = {
		address: {}
	};

	constructor(public dialog: DialogRef<PatientDialogParameters>, protected i18NService: I18nService,
	            protected patientService: PatientService, protected errorService: ErrorService) {
		this.parameters = dialog.context;
		if (this.isUpdate()) {
			this.humanReadableAction = i18NService.instant('COMMON_UPDATE');
			this.title = i18NService.instant('COMMON_UPDATE_PATIENT');
		} else {
			this.humanReadableAction = i18NService.instant('COMMON_CREATE');
			this.title = i18NService.instant('COMMON_CREATE_PATIENT');
		}
	}

	public static getParameters(): PatientDialogParameters {
		return new PatientDialogParameters();
	}

	public ngOnInit() {
		if (this.isUpdate()) {
			this.patientService.getPatient(this.parameters.patientId)
				.subscribe((response) => {
						if (!response.address) {
							response.address = {};
						}
						this.patient = response;
					}
				);
		}
	}

	public close(): void {
		this.dialog.close(false);
	}

	public isUpdate() {
		return this.parameters.patientId;
	}

	public doPerformAction() {
		if (this.isUpdate()) {
			this.updatePatient(this.patient);
		} else {
			this.createPatient(this.patient);
		}
	}

	public doSelectTab(tab: string) {
		this.selectedTab = tab;
	}

	public doAddAllergy() {
		this.allergies.doAddAllergy();
	}

	public doShowOptions() {
		this.allergies.doShowOptions();
	}

	private createPatient(patient: Patient) {
		this.patientService.createPatient(patient)
			.subscribe((result) => {
					this.dialog.close(true);
				},
				(error) => this.errorService.showError(error));
	}

	private updatePatient(patient: Patient) {
		this.patientService.updatePatient(patient.id, patient)
			.subscribe((result) => {
					this.dialog.close(true);
				},
				(error) => this.errorService.showError(error));
	}

}
