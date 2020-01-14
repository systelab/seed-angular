import {Component, OnInit} from '@angular/core';
import {I18nService} from 'systelab-translate/lib/i18n.service';
import {AllergyService} from '@api/allergy.service';
import {Allergy} from '@model/allergy';
import {DialogRef, ModalComponent, SystelabModalContext} from 'systelab-components/widgets/modal';
import {ErrorService} from '@globals/error.service';

export class AllergyDialogParameters extends SystelabModalContext {
	public allergyId: string;
	public width = 700;
	public height = 450;
}

@Component({
	selector: 'allergy-dialog',
	templateUrl: 'allergy-dialog.component.html',
})
export class AllergyDialog implements ModalComponent<AllergyDialogParameters>, OnInit {

	public parameters: AllergyDialogParameters;

	public active = true;
	public title = '';
	public humanReadableAction = '';

	public allergy: Allergy = {};

	constructor(public dialog: DialogRef<AllergyDialogParameters>, protected i18nService: I18nService,
				protected errorService: ErrorService, protected allergyService: AllergyService) {
		this.parameters = dialog.context;
	}

	public static getParameters(): AllergyDialogParameters {
		return new AllergyDialogParameters();
	}

	public ngOnInit() {
		if (this.parameters.allergyId) {
			this.i18nService.get(['COMMON_UPDATE', 'COMMON_UPDATE_ALLERGY'])
				.subscribe((res) => {
					this.humanReadableAction = res.COMMON_UPDATE;
					this.title = res.COMMON_UPDATE_ALLERGY;
				});
			this.loadAllergy(this.parameters.allergyId);
		} else {
			this.i18nService.get(['COMMON_CREATE', 'COMMON_CREATE_ALLERGY'])
				.subscribe((res) => {
					this.humanReadableAction = res.COMMON_CREATE;
					this.title = res.COMMON_CREATE_ALLERGY;
				});
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

	private loadAllergy(allergyId: string) {
		this.allergyService.getAllergy(allergyId)
			.subscribe((response) => this.allergy = response);
	}

	private createAllergy(allergy: Allergy) {
		this.allergyService.createAllergy(allergy)
			.subscribe((result) => this.dialog.close(true),
				(error) => this.errorService.showError(error));
	}

	private updateAllergy(allergy: Allergy) {
		this.allergyService.updateAllergy(allergy.id, allergy)
			.subscribe((result) => this.dialog.close(true),
				(error) => this.errorService.showError(error));
	}

}
