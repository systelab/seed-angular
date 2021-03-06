import { ChangeDetectorRef, Component, Input, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractApiComboBox } from 'systelab-components';
import { Allergy } from '@model/allergy';
import { AllergyService } from '@api/allergy.service';
import { map } from 'rxjs/operators';

@Component({
	selector:    'allergy-combobox',
	templateUrl: '../../../../../node_modules/systelab-components/html/abstract-combobox.component.html'
})

export class AllergyComboBox extends AbstractApiComboBox<Allergy> {

	private totalItems = 0;

	constructor(public myRenderer: Renderer2, public chref: ChangeDetectorRef, public allergyService: AllergyService) {
		super(myRenderer, chref);
	}

	public getInstance() {
		return {};
	}

	public getDescriptionField(): string {
		return 'name';
	}

	public getCodeField(): string {
		return '';
	}

	public getIdField(): string {
		return 'id';
	}

	public getData(page: number, itemsPerPage: number): Observable<Array<Allergy>> {
		return this.allergyService.getAllAllergies(page - 1, itemsPerPage)
			.pipe(map((value) => {
				this.totalItems = value.totalElements;
				return value.content;
			}));
	}

	public getTotalItems() {
		return this.totalItems;
	}
}
