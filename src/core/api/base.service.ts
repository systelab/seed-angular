import {HttpHeaders, HttpParams} from '@angular/common/http';
import { ApiGlobalsService } from '@globals/globals.service';

export class BaseService {

	public defaultHeaders = new HttpHeaders();
	protected basePath = 'http://localhost/seed/v1';

	constructor(basePath: string, protected apiGlobalsService: ApiGlobalsService) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	protected getAuthorizationHeader() {
		return this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);
	}

	/**
	 * @param consumes string[] mime-types
	 * @return true: consumes contains 'multipart/form-data', false: otherwise
	 */
	protected canConsumeForm(consumes: string[]): boolean {
		return consumes.filter(consume => (consume === 'multipart/form-data')).length > 0;

	}

	public isJsonMime(mime: string): boolean {
		const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
		return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
	}

	public getOptions(): {
		headers?: HttpHeaders | {
			[header: string]: string | string[];
		};
		observe?: 'body';
		params?: HttpParams | {
			[param: string]: string | string[];
		};
		reportProgress?: boolean;
		responseType?: 'json';
		withCredentials?: boolean;
	} {
		return { headers: this.getAuthorizationHeader()};
	}

}
