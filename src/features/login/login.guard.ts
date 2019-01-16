import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiGlobalsService } from '@globals/globals.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor(private apiGlobalsService: ApiGlobalsService, private router: Router) {
	}

	public canActivate() {
		if (this.apiGlobalsService.bearer) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
