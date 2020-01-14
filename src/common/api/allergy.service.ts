import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_PATH } from './variables';
import { ApiGlobalsService } from '@globals/globals.service';
import { BaseService } from './base.service';
import { Allergy } from '@model/allergy';
import { Page } from '@model/page';

@Injectable({
	providedIn: 'root'
})
export class AllergyService extends BaseService {

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
	            @Optional() @Inject(BASE_PATH) basePath: string) {
		super(basePath, apiGlobalsService);
	}

	public getAllAllergies(page?: number, itemsPerPage?: number): Observable<Page<Allergy>> {

		let queryParameters = new HttpParams();
		if (page) {
			queryParameters = queryParameters.set('page', <any>page);
		}
		if (itemsPerPage) {
			queryParameters = queryParameters.set('size', <any>itemsPerPage);
		}
		return this.httpClient.get<Page<Allergy>>(`${this.basePath}/allergies`,
			{
				params:  queryParameters,
				headers: this.getAuthorizationHeader()
			}
		);
	}

	public getAllergy(uid: string): Observable<Allergy> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling getAllergy.');
		}
		return this.httpClient.get<Allergy>(`${this.basePath}/allergies/${encodeURIComponent(String(uid))}`, this.getOptions());
	}

	public createAllergy(allergy: Allergy): Observable<Allergy> {
		if (!allergy) {
			throw new Error('Required parameter allergy was null or undefined when calling createAllergy.');
		}
		return this.httpClient.post<Allergy>(`${this.basePath}/allergies/allergy`, allergy, this.getOptions());
	}

	public updateAllergy(uid: string, allergy: Allergy): Observable<Allergy> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling updateAllergy.');
		}
		if (!allergy) {
			throw new Error('Required parameter allergy was null or undefined when calling updateAllergy.');
		}
		return this.httpClient.put<Allergy>(`${this.basePath}/allergies/${encodeURIComponent(String(uid))}`, allergy, this.getOptions());
	}

	public removeAllergy(uid: string): Observable<any> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}
		return this.httpClient.delete<any>(`${this.basePath}/allergies/${encodeURIComponent(String(uid))}`, this.getOptions());
	}
}
