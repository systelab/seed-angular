import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpParams, HttpResponseBase} from '@angular/common/http';
import {Observable} from 'rxjs';

import {User} from '@model/user';
import {BASE_PATH} from './variables';
import {ApiGlobalsService} from '@globals/globals.service';
import {BaseService} from './base.service';
import {Page} from '@model/page';

@Injectable({
	providedIn: 'root'
})
export class UserService extends BaseService {

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
				@Optional() @Inject(BASE_PATH) basePath: string) {
		super(basePath, apiGlobalsService);
	}

	public authenticateUser(login?: string, password?: string): Observable<HttpResponseBase> {

		const headers = this.defaultHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
		const body = new HttpParams().set('login', login).set('password', password);

		return this.httpClient.post<HttpResponseBase>(`${this.basePath}/users/login`, body, {
			headers: headers,
			observe: 'response'
		});
	}

	public create(user: User): Observable<User> {
		if (!user) {
			throw new Error('Required parameter body was null or undefined when calling create.');
		}
		return this.httpClient.post<any>(`${this.basePath}/users/user`, user, this.getOptions());
	}

	public findById(uid: string): Observable<User> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling findById.');
		}
		return this.httpClient.get<any>(`${this.basePath}/users/${encodeURIComponent(String(uid))}`, this.getOptions());
	}

	public getAllUsers(page: number, itemsPerPage: number): Observable<Page<User>> {

		let queryParameters = new HttpParams();
		if (page) {
			queryParameters = queryParameters.set('page', <any>page);
		}
		if (itemsPerPage) {
			queryParameters = queryParameters.set('size', <any>itemsPerPage);
		}
		return this.httpClient.get<any>(`${this.basePath}/users`, {
			params: queryParameters,
			headers: this.getAuthorizationHeader()
		});
	}

	public remove(uid: string): Observable<{}> {
		if (!uid) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}
		return this.httpClient.delete<any>(`${this.basePath}/users/${encodeURIComponent(String(uid))}`, {
			headers: this.getAuthorizationHeader(),
		});
	}
}
