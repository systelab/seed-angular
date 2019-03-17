import { ChangeDetectorRef, Component, Input, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractApiComboBox } from 'systelab-components/widgets/combobox/abstract-api-combobox.component';
import { Allergy } from '@model/allergy';
import { AllergyService } from '@api/allergy.service';
import { map } from 'rxjs/operators';

@Component({
	selector:    'allergy-combobox',
	templateUrl: '../../../../../node_modules/systelab-components/html/abstract-combobox.component.html'
})

export class AllergyComboBox extends AbstractApiComboBox<Allergy> {

	private totalItems = 0;
	private _startsWith: string;

	@Input()
	set startsWith(value: string) {
		this._startsWith = value;
		this.id = '';
		this.description = '';
		this.refresh(null);
	}

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
