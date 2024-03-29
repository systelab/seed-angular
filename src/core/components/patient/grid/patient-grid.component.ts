import {Component} from '@angular/core';
import {I18nService} from 'systelab-translate';
import {Patient} from '@model/patient';
import {PatientService} from '@api/patient.service';
import {AbstractApiGrid, DialogService} from 'systelab-components';
import {PreferencesService} from 'systelab-preferences';
import {Observable, map} from 'rxjs';

@Component({
	selector: 'patient-grid',
	templateUrl: '../../../../../node_modules/systelab-components/html/abstract-grid.component.html'
})
export class PatientGrid extends AbstractApiGrid<Patient> {

	private totalItems = 0;

	constructor(protected preferencesService: PreferencesService, protected i18nService: I18nService, protected dialogService: DialogService, protected patientService: PatientService) {
		super(preferencesService, i18nService, dialogService);
	}

	protected getColumnDefs(): Array<any> {
		const columnDefs: Array<any> = [];
		this.i18nService.get(['COMMON_NAME', 'COMMON_SURNAME', 'COMMON_MAIL'])
			.subscribe((res) => {
				columnDefs.push(
					{colId: 'name', headerName: res.COMMON_NAME, field: 'name', width: 300},
					{colId: 'surname', headerName: res.COMMON_SURNAME, field: 'surname', width: 300},
					{colId: 'email', headerName: res.COMMON_MAIL, field: 'email', width: 200});
			});
		return columnDefs;
	}

	public getTotalItems() {
		return this.totalItems;
	}

	public getData(page: number, itemsPerPage: number): Observable<Array<Patient>> {
		return this.patientService.getAllPatients(page - 1, itemsPerPage)
			.pipe(map((value) => {
				this.totalItems = value.totalElements;
				return value.content;
			}));
	}
}
