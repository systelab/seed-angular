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

	/**
	 * Get all Allergies
	 * @param page
	 * @param itemsPerPage
	 */
	public getAllAllergies(page?: number, itemsPerPage?: number): Observable<Page<Allergy>> {

		let queryParameters = new HttpParams();
		if (page !== null) {
			queryParameters = queryParameters.set('page', <any>page);
		}
		if (itemsPerPage !== null) {
			queryParameters = queryParameters.set('size', <any>itemsPerPage);
		}
		return this.httpClient.get<Page<Allergy>>(`${this.basePath}/v1/allergies`,
			{
				params:  queryParameters,
				headers: this.getAuthorizationHeader()
			}
		);
	}

	/**
	 * Get Allergy
	 * @param uid
	 */
	public getAllergy(uid: string): Observable<Allergy> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling getAllergy.');
		}

		return this.httpClient.get<Allergy>(`${this.basePath}/v1/allergies/${encodeURIComponent(String(uid))}`,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}

	/**
	 * Create an Allergy
	 * @param allergy Allergy
	 */
	public createAllergy(allergy: Allergy): Observable<Allergy> {
		if (allergy === null || allergy === undefined) {
			throw new Error('Required parameter allergy was null or undefined when calling createAllergy.');
		}

		return this.httpClient.post<Allergy>(`${this.basePath}/v1/allergies/allergy`, allergy,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}

	/**
	 * Create or Update (idempotent) an existing Allergy
	 * @param uid
	 * @param allergy Allergy
	 */
	public updateAllergy(uid: string, allergy: Allergy): Observable<Allergy> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling updateAllergy.');
		}
		if (allergy === null || allergy === undefined) {
			throw new Error('Required parameter allergy was null or undefined when calling updateAllergy.');
		}

		return this.httpClient.put<Allergy>(`${this.basePath}/v1/allergies/${encodeURIComponent(String(uid))}`, allergy,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}

	/**
	 * Delete an Allergy
	 * @param uid
	 */
	public removeAllergy(uid: string): Observable<any> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}

		return this.httpClient.delete<any>(`${this.basePath}/v1/allergies/${encodeURIComponent(String(uid))}`,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}
}
