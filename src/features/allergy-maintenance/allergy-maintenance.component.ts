import {Component, ViewChild} from '@angular/core';
import {DialogService, GridContextMenuActionData, GridContextMenuOption} from 'systelab-components';
import {I18nService} from 'systelab-translate';
import {AllergyGrid} from '@components/allergy/grid/allergy-grid.component';
import {AllergyService} from '@api/allergy.service';
import {Allergy} from '@model/allergy';
import {
	AllergyDialog,
	AllergyDialogParameters
} from '@features/allergy-maintenance/alergy-detail-dialog/allergy-dialog.component';
import {ErrorService} from '@globals/error.service';

@Component({
	selector: 'allergy-maintenance',
	templateUrl: './allergy-maintenance.component.html'
})
export class AllergyMaintenanceComponent {

	@ViewChild('allergygrid', {static: false}) public allergygrid: AllergyGrid;

	constructor(protected dialogService: DialogService, protected allergyService: AllergyService,
				protected i18nService: I18nService, protected errorService: ErrorService) {
	}

	public doCreateAllergy() {
		const parameters: AllergyDialogParameters = AllergyDialog.getParameters();
		this.dialogService.showDialog(AllergyDialog, parameters)
			.subscribe((result) => {
					if (result) {
						this.allergygrid.refresh();
					}
				}
			);
	}

	public doSelect(allergy: Allergy): void {

		const parameters: AllergyDialogParameters = AllergyDialog.getParameters();
		parameters.allergyId = allergy.id;

		this.dialogService.showDialog(AllergyDialog, parameters)
			.subscribe((result) => {
					if (result) {
						this.allergygrid.refresh();
					}
				}
			);
	}

	public getMenu(): Array<GridContextMenuOption<Allergy>> {
		const menuDefs: Array<GridContextMenuOption<Allergy>> = [];
		this.i18nService.get(['COMMON_UPDATE', 'COMMON_DELETE'])
			.subscribe((res) => {
				menuDefs.push(new GridContextMenuOption('action1', res.COMMON_UPDATE));
				menuDefs.push(new GridContextMenuOption('action2', res.COMMON_DELETE));
			});
		return menuDefs;
	}

	public doMenuAction(contextMenuActionData: GridContextMenuActionData<Allergy>) {
		if (contextMenuActionData.actionId === 'action1') {
			this.updateAllergy(contextMenuActionData);
		} else if (contextMenuActionData.actionId === 'action2') {
			this.deleteAllergy(contextMenuActionData);
		}
	}

	private updateAllergy(contextMenuActionData: GridContextMenuActionData<Allergy>) {
		this.doSelect(contextMenuActionData.data);
	}

	private deleteAllergy(contextMenuActionData: GridContextMenuActionData<Allergy>) {
		this.allergyService.removeAllergy(contextMenuActionData.data.id)
			.subscribe(result => this.allergygrid.refresh(),
				error => this.errorService.showError(error));
	}
}
