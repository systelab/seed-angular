import { Component, OnInit } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { AllergyService } from '@api/allergy.service';
import { Allergy } from '@model/allergy';
import { DialogRef, MessagePopupService, ModalComponent, SystelabModalContext } from 'systelab-components/widgets/modal';
import { HttpErrorResponse } from '@angular/common/http';

export class AllergyDialogParameters extends SystelabModalContext {
	public allergyId: string;
	public width = 700;
	public height = 450;
}

@Component({
	selector:    'allergy-dialog',
	templateUrl: 'allergy-dialog.component.html',
})
export class AllergyDialog implements ModalComponent<AllergyDialogParameters>, OnInit {

	public parameters: AllergyDialogParameters;

	public active = true;
	public title = '';
	public humanReadableAction = '';

	public allergy: Allergy = {};

	constructor(public dialog: DialogRef<AllergyDialogParameters>, protected i18NService: I18nService,
	            protected messagePopupService: MessagePopupService, protected allergyService: AllergyService) {
		this.parameters = dialog.context;
		if (this.parameters.allergyId) {
			this.humanReadableAction = i18NService.instant('COMMON_UPDATE');
			this.title = i18NService.instant('COMMON_UPDATE_ALLERGY');
		} else {
			this.humanReadableAction = i18NService.instant('COMMON_CREATE');
			this.title = i18NService.instant('COMMON_CREATE_ALLERGY');

		}
	}

	public static getParameters(): AllergyDialogParameters {
		return new AllergyDialogParameters();
	}

	public ngOnInit() {
		if (this.parameters.allergyId) {

			this.allergyService.getAllergy(this.parameters.allergyId)
				.subscribe((response) => {
						this.allergy = response;
					}
				);
		}
	}

	public close(): void {
		this.dialog.close(false);
	}

	public doPerformAction() {
		if (this.parameters.allergyId) {
			this.updateAllergy(this.allergy);
		} else {
			this.createAllergy(this.allergy);
		}
	}

	private createAllergy(allergy: Allergy) {
		this.allergyService.createAllergy(allergy)
			.subscribe((result) => {
					this.dialog.close(true);
				},
				(error) => this.showError(error));
	}

	private updateAllergy(allergy: Allergy) {
		this.allergyService.updateAllergy(allergy.id, allergy)
			.subscribe((result) => {
					this.dialog.close(true);
				},
				(error) => this.showError(error));
	}

	private showError(error: HttpErrorResponse) {
		this.messagePopupService.showErrorPopup(this.i18NService.instant('ERR_ERROR'), error.message);
	}
}
