import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGlobalsService } from '@globals/globals.service';
import { UserService } from '@api/user.service';
import { MessagePopupService } from 'systelab-components/widgets/modal';
import { I18nService } from 'systelab-translate/lib/i18n.service';

@Component({
	selector:    'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent {

	public userName = '';
	public password = '';

	constructor(protected router: Router, protected userService: UserService, protected apiGlobalsService: ApiGlobalsService, protected i18NService: I18nService,
	            protected messagePopupService: MessagePopupService) {
	}

	public doLogin(event: any) {
		if (this.userName && this.password) {
			this.userService.authenticateUser(this.userName, this.password)
				.subscribe(
					(response) => {
						this.apiGlobalsService.bearer = response.headers.get('Authorization');
						this.router.navigateByUrl('/main');
					},
					() => this.showError());
		}
	}

	private showError() {
		this.messagePopupService.showErrorPopup(this.i18NService.instant('COMMON_CREDENTIALS'), this.i18NService.instant('ERR_INVALID_USERNAME_PASSWORD'));
	}
}
