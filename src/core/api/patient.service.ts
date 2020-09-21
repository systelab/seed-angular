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

	public createPatient(patient: Patient): Observable<Patient> {
		if (!patient) {
			throw new Error('Required parameter patient was null or undefined when calling createPatient.');
		}
		return this.httpClient.post<any>(`${this.basePath}/patients/patient`, patient, this.getOptions());
	}

	public getAllPatients(page: number, itemsPerPage: number): Observable<Page<Patient>> {

		let queryParameters = new HttpParams();
		if (page) {
			queryParameters = queryParameters.set('page', <any>page);
		}
		if (itemsPerPage) {
			queryParameters = queryParameters.set('size', <any>itemsPerPage);
		}
		return this.httpClient.get<any>(`${this.basePath}/patients`, {
			params:  queryParameters,
			headers: this.getAuthorizationHeader(),
		});
	}

	public getPatient(uid: string): Observable<Patient> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling getPatient.');
		}
		return this.httpClient.get<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, this.getOptions());
	}

	public remove(uid: string): Observable<{}> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}
		return this.httpClient.delete<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, this.getOptions());
	}

	public updatePatient(uid: string, patient: Patient): Observable<Patient> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling updatePatient.');
		}
		if (!patient) {
			throw new Error('Required parameter patient was null or undefined when calling updatePatient.');
		}
		return this.httpClient.put<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, patient, this.getOptions());
	}
}
