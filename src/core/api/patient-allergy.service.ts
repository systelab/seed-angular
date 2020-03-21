import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_PATH} from './variables';
import {ApiGlobalsService} from '@globals/globals.service';
import {BaseService} from './base.service';
import {PatientAllergy} from '@model/patient-allergy';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PatientAllergyService extends BaseService {

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
				@Optional() @Inject(BASE_PATH) basePath: string) {
		super(basePath, apiGlobalsService);
	}

	public getPatientAllergies(uid: string): Observable<Array<PatientAllergy>> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling getPatientAllergies.');
		}
		return this.httpClient.get<Array<PatientAllergy>>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}/allergies`, this.getOptions())
			.pipe(map(allergies => allergies.map(this.convertDates())));
	}

	public addAllergyToPatient(uid: string, patientAllergy: PatientAllergy): Observable<PatientAllergy> {
		if (!uid ) {
			throw new Error('Required parameter uid was null or undefined when calling addAllergyToPatient.');
		}
		if (!patientAllergy) {
			throw new Error('Required parameter patientAllergy was null or undefined when calling addAllergyToPatient.');
		}
		return this.httpClient.post<PatientAllergy>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}/allergies/allergy`,
			patientAllergy, this.getOptions()).pipe(map(this.convertDates()));
	}

	public updateAllergyFromPatient(patientId: string, allergyId: string, patientAllergy: PatientAllergy): Observable<PatientAllergy> {
		if (!patientId) {
			throw new Error('Required parameter patientId was null or undefined when calling updateAllergyToPatient.');
		}
		if (!allergyId) {
			throw new Error('Required parameter allergyId was null or undefined when calling updateAllergyToPatient.');
		}
		if (!patientAllergy) {
			throw new Error('Required parameter patientAllergy was null or undefined when calling updateAllergyToPatient.');
		}
		return this.httpClient.put<PatientAllergy>(`${this.basePath}/patients/${encodeURIComponent(String(patientId))}/allergies/${encodeURIComponent(String(allergyId))}`,
			patientAllergy, this.getOptions()).pipe(map(this.convertDates()));
	}

	private convertDates() {
		return (data: PatientAllergy) => {
			data.assertedDate = new Date(data.assertedDate);
			data.lastOccurrence = new Date(data.lastOccurrence);
			return data;
		};
	}

	public deleteAllergiesFromPatient(patientId: string, allergyId: string): Observable<any> {
		if (!patientId) {
			throw new Error('Required parameter patientId was null or undefined when calling deleteAllergyFromPatient.');
		}
		if (!allergyId) {
			throw new Error('Required parameter allergyId was null or undefined when calling deleteAllergyFromPatient.');
		}
		return this.httpClient.delete<any>(`${this.basePath}/patients/${encodeURIComponent(String(patientId))}/allergies/${encodeURIComponent(String(allergyId))}`, this.getOptions());
	}
}
