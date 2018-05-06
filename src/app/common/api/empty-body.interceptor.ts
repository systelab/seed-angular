import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  of ,  throwError as _throw } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Trick to solve error corrected in version 5.2 by Alex and Misko in https://github.com/angular/angular/commit/503be69af65e85def00da1d2a049e8ebb8059e47
@Injectable()
export class EmptyBodyInterceptor implements HttpInterceptor {

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(catchError(response => {
				if (response instanceof HttpErrorResponse) {

					// Check if this error has a 2xx status
					if (this.is2xxStatus(response)) {

						// Convert the error to a standard response with a null body and then return
						return of(new HttpResponse({
							headers:    response.headers,
							status:     response.status,
							statusText: response.statusText,
							url:        response.url
						}));
					}
				}
				// This is a real error, rethrow
				return _throw(response);
			}));
	}

	private is2xxStatus(response: HttpResponseBase) {
		return response.status >= 200 && response.status < 300 && response.statusText === 'OK';
	}

}
