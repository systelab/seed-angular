import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { BASE_PATH } from '../variables';
import { ApiGlobalsService } from '../../globals/globals.service';

@Injectable()
export class UserService {

	protected basePath = 'http://localhost/seed/v1';
	public defaultHeaders = new HttpHeaders();

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
	            @Optional() @Inject(BASE_PATH) basePath: string) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	/**
	 * @param consumes string[] mime-types
	 * @return true: consumes contains 'multipart/form-data', false: otherwise
	 */
	private canConsumeForm(consumes: string[]): boolean {
		const form = 'multipart/form-data';
		for (const consume of consumes) {
			if (form === consume) {
				return true;
			}
		}
		return false;
	}

	public isJsonMime(mime: string): boolean {
		const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
		return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
	}

	/**
	 * User Login
	 *
	 * @param login
	 * @param password
	 */
	public authenticateUser(login?: string, password?: string): Observable<HttpResponseBase> {

		const headers = this.defaultHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
		const body = new HttpParams().set('login', login).set('password', password);

		return this.httpClient.post<HttpResponseBase>(`${this.basePath}/users/login`, body, {
			headers: headers,
			observe: 'response',

		});
	}

	/**
	 * Create a User
	 *
	 * @param body User
	 */
	public create(body: User): Observable<User> {
		if (body === null || body === undefined) {
			throw new Error('Required parameter body was null or undefined when calling create.');
		}

		const headers = this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);

		return this.httpClient.post<any>(`${this.basePath}/users/user`, body, {
			headers: headers,
		});
	}

	/**
	 * Get User
	 *
	 * @param uid
	 */
	public findById(uid: number): Observable<User> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling findById.');
		}

		const headers = this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);

		return this.httpClient.get<any>(`${this.basePath}/users/${encodeURIComponent(String(uid))}`, {
			headers: headers,
		});
	}

	/**
	 * Get all Users
	 *
	 */
	public getAllUsers(): Observable<Array<User>> {

		const headers = this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);
		return this.httpClient.get<any>(`${this.basePath}/users`, {
			headers: headers
		});
	}

	/**
	 * Delete a User
	 *
	 * @param uid
	 */
	public remove(uid: number): Observable<{}> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}

		const headers = this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);

		return this.httpClient.delete<any>(`${this.basePath}/users/${encodeURIComponent(String(uid))}`, {
			headers: headers,
		});
	}

}
