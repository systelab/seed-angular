import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@model/user';
import { BASE_PATH } from './variables';
import { ApiGlobalsService } from '@globals/globals.service';
import { BaseService } from './base.service';
import { Page } from '@model/page';

@Injectable({
	providedIn: 'root'
})
export class UserService extends BaseService {

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
	            @Optional() @Inject(BASE_PATH) basePath: string) {
		super(basePath, apiGlobalsService);
	}

	/**
	 * User Login
	 *
	 * @param login
	 * @param password
	 */
	public authenticateUser(login?: string, password?: string): Observable<HttpResponseBase> {

		const headers = this.defaultHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
		const body = new HttpParams().set('login', login)
			.set('password', password);

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

		return this.httpClient.post<any>(`${this.basePath}/users/user`, body, {
			headers: this.getAuthorizationHeader(),
		});
	}

	/**
	 * Get User
	 *
	 * @param uid
	 */
	public findById(uid: string): Observable<User> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling findById.');
		}

		return this.httpClient.get<any>(`${this.basePath}/users/${encodeURIComponent(String(uid))}`, {
			headers: this.getAuthorizationHeader(),
		});
	}

	/**
	 * Get all Users
	 *
	 */
	public getAllUsers(page: number, itemsPerPage: number): Observable<Page<User>> {

		let queryParameters = new HttpParams();
		if (page !== null) {
			queryParameters = queryParameters.set('page', <any>page);
		}
		if (itemsPerPage !== null) {
			queryParameters = queryParameters.set('size', <any>itemsPerPage);
		}

		return this.httpClient.get<any>(`${this.basePath}/users`, {
			params:  queryParameters,
			headers: this.getAuthorizationHeader()
		});
	}

	/**
	 * Delete a User
	 *
	 * @param uid
	 */
	public remove(uid: string): Observable<{}> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}

		return this.httpClient.delete<any>(`${this.basePath}/users/${encodeURIComponent(String(uid))}`, {
			headers: this.getAuthorizationHeader(),
		});
	}

}
