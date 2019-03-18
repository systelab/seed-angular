import { Component, Input } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { PreferencesService } from 'systelab-preferences/lib/preferences.service';
import { AbstractApiGrid } from 'systelab-components/widgets/grid/abstract-api-grid.component';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/internal/operators';
import { PatientAllergy } from '@model/patient-allergy';
import { PatientAllergyService } from '@api/patient-allergy.service';

@Component({
	selector:    'patient-allergy-grid',
	templateUrl: '../../../../../node_modules/systelab-components/html/abstract-grid.component.html'
})
export class PatientAllergyGrid extends AbstractApiGrid<PatientAllergy> {

	@Input() public patientId: string;

	private totalItems = 0;

	constructor(protected preferencesService: PreferencesService, protected i18nService: I18nService, protected dialogService: DialogService, protected patientAllergyService: PatientAllergyService) {
		super(preferencesService, i18nService, dialogService);
	}

	protected getColumnDefs(): Array<any> {
		const columnDefs: Array<any> = [];

		columnDefs.push({
			colId:    'name', headerName: this.i18nService.instant('COMMON_NAME'), valueGetter: (params: any) => {
				return this.getAllergyName(params.data);
			}, width: 300
		}, {
			colId:    'asserted', headerName: this.i18nService.instant('COMMON_ASSERTED_DATE'), valueGetter: (params: any) => {
				return this.getAssertedDate(params.data);
			}, width: 200
		}, {
			colId: 'note', headerName: this.i18nService.instant('COMMON_NOTES'), field: 'note', width: 200
		});
		return columnDefs;
	}

	private getAllergyName(patientAllergy: PatientAllergy): string {
		return (patientAllergy && patientAllergy.allergy) ? patientAllergy.allergy.name : '';
	}

	private getAssertedDate(patientAllergy: PatientAllergy): string {
		return (patientAllergy && patientAllergy.assertedDate) ? this.i18nService.formatDate(patientAllergy.assertedDate) : '';
	}

	private getLastOccurrenceDate(patientAllergy: PatientAllergy): string {
		return (patientAllergy && patientAllergy.lastOccurrence) ? this.i18nService.formatDate(patientAllergy.lastOccurrence) : '';
	}

	public getTotalItems() {
		return this.totalItems;
	}

	public getData(page: number, itemsPerPage: number): Observable<Array<PatientAllergy>> {
		return this.patientAllergyService.getPatientAllergies(this.patientId)
			.pipe(map((value) => {
				this.totalItems = value.length;
				return value;
			}));
	}
}
