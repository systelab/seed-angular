import { Component } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { PreferencesService } from 'systelab-preferences/lib/preferences.service';
import { AbstractApiGrid } from 'systelab-components/widgets/grid/abstract-api-grid.component';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/internal/operators';
import { AllergyService } from '@api/allergy.service';
import { Allergy } from '@model/allergy';

@Component({
	selector:    'allergy-grid',
	templateUrl: '../../../../../node_modules/systelab-components/html/abstract-grid.component.html'
})
export class AllergyGrid extends AbstractApiGrid<Allergy> {

	private totalItems = 0;

	constructor(protected preferencesService: PreferencesService, protected i18nService: I18nService, protected dialogService: DialogService, protected allergyService: AllergyService) {
		super(preferencesService, i18nService, dialogService);
	}

	protected getColumnDefs(): Array<any> {
		const columnDefs: Array<any> = [];
		this.i18nService.get(['COMMON_NAME', 'COMMON_SIGNS', 'COMMON_SYMPTOMS'])
			.subscribe((res) => {
				columnDefs.push(
					{colId: 'name', headerName: res.COMMON_NAME, field: 'name', width: 300},
					{colId: 'signs', headerName: res.COMMON_SIGNS, field: 'signs', width: 300},
					{colId: 'symptoms', headerName: res.COMMON_SYMPTOMS, field: 'symptoms', width: 200});
			});
		return columnDefs;
	}

	public getTotalItems() {
		return this.totalItems;
	}

	public getData(page: number, itemsPerPage: number): Observable<Array<Allergy>> {
		return this.allergyService.getAllAllergies(page - 1, itemsPerPage)
			.pipe(map((value) => {
				this.totalItems = value.totalElements;
				return value.content;
			}));
	}
}
