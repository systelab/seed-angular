import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGlobalsService } from '../globals/globals.service';
import { UserService } from '../common/api/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector:    'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent {

	public userName = '';
	public password = '';

	constructor(protected router: Router, protected userService: UserService, protected apiGlobalsService: ApiGlobalsService) {

	}

	public doLogin() {
		this.userService.authenticateUser(this.userName, this.password)
			.subscribe(
				(response) => {
					this.apiGlobalsService.bearer = response.headers.get('Authorization');
					this.router.navigateByUrl('/main');
				},
				(error) => {
				}
			);
	}
}
