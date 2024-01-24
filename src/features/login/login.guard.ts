import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGlobalsService } from '@globals/globals.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard  {

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
