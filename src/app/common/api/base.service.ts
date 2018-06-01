import { HttpHeaders } from '@angular/common/http';
import { ApiGlobalsService } from '../../globals/globals.service';

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

}
