import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_PATH } from './variables';
import { ApiGlobalsService } from '@globals/globals.service';
import { BaseService } from './base.service';
import { PatientAllergy } from '@model/patient-allergy';

@Injectable({
	providedIn: 'root'
})
export class PatientAllergyService extends BaseService {

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
	            @Optional() @Inject(BASE_PATH) basePath: string) {
		super(basePath, apiGlobalsService);
	}

	/**
	 * Get Patient allergies
	 * @param uid
	 */
	public getPatientAllergies(uid: string): Observable<Array<PatientAllergy>> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling getPatientAllergies.');
		}

		return this.httpClient.get<Array<PatientAllergy>>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}/allergies`,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}

	/**
	 * Add allergy to patient
	 * @param uid
	 * @param patientAllergy Allergy
	 */
	public addAllergyToPatient(uid: string, patientAllergy: PatientAllergy): Observable<PatientAllergy> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling addAllergyToPatient.');
		}
		if (patientAllergy === null || patientAllergy === undefined) {
			throw new Error('Required parameter patientAllergy was null or undefined when calling addAllergyToPatient.');
		}

		return this.httpClient.post<PatientAllergy>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}/allergies/allergy`,
			patientAllergy,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}

	/**
	 * Add allergy to patient
	 * @param patientId
	 * @param allergyId
	 * @param patientAllergy Allergy
	 */
	public updateAllergyFromPatient(patientId: string, allergyId: string, patientAllergy: PatientAllergy): Observable<PatientAllergy> {
		if (patientId === null || patientId === undefined) {
			throw new Error('Required parameter patientId was null or undefined when calling updateAllergyToPatient.');
		}
		if (allergyId === null || allergyId === undefined) {
			throw new Error('Required parameter allergyId was null or undefined when calling updateAllergyToPatient.');
		}
		if (patientAllergy === null || patientAllergy === undefined) {
			throw new Error('Required parameter patientAllergy was null or undefined when calling updateAllergyToPatient.');
		}

		return this.httpClient.put<PatientAllergy>(`${this.basePath}/patients/${encodeURIComponent(String(patientId))}/allergies/${encodeURIComponent(String(allergyId))}`,
			patientAllergy,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}

	/**
	 * Remove allergy from patient
	 * @param patientId
	 * @param allergyId
	 */
	public deleteAllergiesFromPatient(patientId: string, allergyId: string): Observable<any> {
		if (patientId === null || patientId === undefined) {
			throw new Error('Required parameter patientId was null or undefined when calling deleteAllergyFromPatient.');
		}
		if (allergyId === null || allergyId === undefined) {
			throw new Error('Required parameter allergyId was null or undefined when calling deleteAllergyFromPatient.');
		}

		return this.httpClient.delete<any>(`${this.basePath}/patients/${encodeURIComponent(String(patientId))}/allergies/${encodeURIComponent(String(allergyId))}`,
			{
				headers: this.getAuthorizationHeader()
			}
		);
	}
}
