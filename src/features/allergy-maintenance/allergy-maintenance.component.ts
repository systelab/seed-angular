import { Component, OnInit, ViewChild } from '@angular/core';
import { GridContextMenuOption } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-option';
import { GridContextMenuActionData } from 'systelab-components/widgets/grid/contextmenu/grid-context-menu-action-data';
import { DialogService } from 'systelab-components/widgets/modal';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { AllergyGrid } from '@components/allergy/grid/allergy-grid.component';
import { AllergyService } from '@api/allergy.service';
import { Allergy } from '@model/allergy';
import { AllergyDialog, AllergyDialogParameters } from '@features/allergy-maintenance/alergy-detail-dialog/allergy-dialog.component';

@Component({
	selector:    'allergy-maintenance',
	templateUrl: './allergy-maintenance.component.html'
})
export class AllergyMaintenanceComponent implements OnInit {

	@ViewChild('allergygrid') public allergygrid: AllergyGrid;

	constructor(protected dialogService: DialogService, protected allergyService: AllergyService, protected i18nService: I18nService) {
	}

	public ngOnInit() {
	}

	public doCreateAllergy() {

		const parameters: AllergyDialogParameters = AllergyDialog.getParameters();
		this.dialogService.showDialog(AllergyDialog, parameters)
			.subscribe(
				(result) => {
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
			.subscribe(
				(result) => {
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
				menuDefs.push(new GridContextMenuOption('action1', res.COMMON_UPDATE), new GridContextMenuOption('action2', res.COMMON_DELETE));
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
			.subscribe(result => this.allergygrid.refresh(), error => console.log('error'));
	}
}
