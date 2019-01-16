import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '@model/patient';
import { BASE_PATH } from './variables';
import { ApiGlobalsService } from '@globals/globals.service';
import { BaseService } from './base.service';
import { Page } from '@model/page';

@Injectable({
	providedIn: 'root'
})
export class PatientService extends BaseService {

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
	            @Optional() @Inject(BASE_PATH) basePath: string) {
		super(basePath, apiGlobalsService);
	}

	/**
	 * Create a Patient
	 *
	 * @param body Patient
	 */
	public createPatient(body: Patient): Observable<Patient> {
		if (body === null || body === undefined) {
			throw new Error('Required parameter body was null or undefined when calling createPatient.');
		}

		return this.httpClient.post<any>(`${this.basePath}/patients/patient`, body, {
			headers: this.getAuthorizationHeader(),
		});
	}

	/**
	 * Get all Patients
	 *
	 */
	public getAllPatients(page: number, itemsPerPage: number): Observable<Page<Patient>> {

		let queryParameters = new HttpParams();
		if (page !== null) {
			queryParameters = queryParameters.set('page', <any>page);
		}
		if (itemsPerPage !== null) {
			queryParameters = queryParameters.set('size', <any>itemsPerPage);
		}
		return this.httpClient.get<any>(`${this.basePath}/patients`, {
			params:  queryParameters,
			headers: this.getAuthorizationHeader(),
		});
	}

	/**
	 * Get Patient
	 *
	 * @param uid
	 */
	public getPatient(uid: string): Observable<Patient> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling getPatient.');
		}

		return this.httpClient.get<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, {
			headers: this.getAuthorizationHeader(),
		});
	}

	/**
	 * Delete a Patient
	 *
	 * @param uid
	 */
	public remove(uid: string): Observable<{}> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}

		return this.httpClient.delete<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, {
			headers: this.getAuthorizationHeader(),
		});
	}

	/**
	 * Create or Update (idempotent) an existing Patient
	 *
	 * @param uid
	 * @param body Patient
	 */
	public updatePatient(uid: string, body: Patient): Observable<Patient> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling updatePatient.');
		}
		if (body === null || body === undefined) {
			throw new Error('Required parameter body was null or undefined when calling updatePatient.');
		}

		return this.httpClient.put<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, body, {
			headers: this.getAuthorizationHeader(),
		});
	}
}
