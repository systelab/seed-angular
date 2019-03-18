import { Observable, of as observableOf } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { ApiGlobalsService } from '@globals/globals.service';
import { Router } from '@angular/router';
import { MessagePopupService } from 'systelab-components/widgets/modal';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { PatientMaintenanceDialog, PatientMaintenanceDialogParameters } from '@features/patient-maintenance/patient-maintenance-dialog.component';
import { ApplicationHeaderMenuEntry } from 'systelab-components/widgets/applicationframe/header/app-header.component';
import { ApplicationSidebarAction, ApplicationSidebarTab } from 'systelab-components/widgets/applicationframe/sidebar/app-sidebar.component';
import { ChangePasswordDialog, ChangePasswordDialogParameters } from 'systelab-login/widgets/change-password-dialog.component';
import { LocalStorageService } from 'systelab-preferences/lib/local-storage.service';

@Component({
	selector:    'main',
	templateUrl: 'main.component.html',
	styleUrls:   ['main.component.scss']
})
export class MainComponent implements OnInit {
	title = 'Angular Seed Application';

	public userName: string;
	public userFullName: string;
	public hospitalName: string;
	public logoIcon: string;

	public menu: ApplicationHeaderMenuEntry[] = [];
	public sideactions: ApplicationSidebarAction[] = [];
	public sidetabs: ApplicationSidebarTab[] = [];

	public showConfiguration = false;

	constructor(private router: Router, protected messagePopupService: MessagePopupService,
	            protected dialogService: DialogService, protected i18nService: I18nService,
	            protected apiGlobalsService: ApiGlobalsService, private localStorage: LocalStorageService) {
	}

	public ngOnInit() {

		this.userName = 'admin';
		this.userFullName = 'Administrator';
		this.hospitalName = 'Customer name';
		this.logoIcon = 'fab fa-stumbleupon-circle';

		this.setMenu();
		this.setSideTabs();
		this.setSideButtons();
	}

	public setMenu() {

		this.menu = [];
		this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_ABOUT'), false, () => this.doShowAbout()));
		this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_SETUP'), false, () => this.doShowSettings()));
		this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_CHANGE_PASSWORD'), false, () => this.doChangePassword()));
		this.menu.push(new ApplicationHeaderMenuEntry('', true));

		this.menu.push(new ApplicationHeaderMenuEntry('English', false, () => this.doChangeLanguage('en')));
		this.menu.push(new ApplicationHeaderMenuEntry('Español', false, () => this.doChangeLanguage('es-ES')));
		this.menu.push(new ApplicationHeaderMenuEntry('Italiano', false, () => this.doChangeLanguage('it-IT')));
		this.menu.push(new ApplicationHeaderMenuEntry('한국어', false, () => this.doChangeLanguage('kr-KR')));
		this.menu.push(new ApplicationHeaderMenuEntry('', true));
		this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_CHANGE_USER'), false, () => this.doLogout()));
	}

	public setSideTabs() {
		this.sidetabs.push(new ApplicationSidebarTab('T1', this.i18nService.instant('COMMON_TAB_ONE'), true, null, null, 'fas fa-tachometer-alt'));
		this.sidetabs.push(new ApplicationSidebarTab('T2', this.i18nService.instant('COMMON_TAB_TWO'), false, null, null, 'fas fa-satellite-dish'));
		this.sidetabs.push(new ApplicationSidebarTab('T3', this.i18nService.instant('COMMON_TAB_THREE'), false, null, null, 'fas fa-award'));
		this.sidetabs.push(new ApplicationSidebarTab('T4', this.i18nService.instant('COMMON_TAB_FOUR'), false, null, null, 'fas fa-tools'));
	}

	public setSideButtons() {
		this.sideactions.push(new ApplicationSidebarAction('Button', null, 'fas fa-bong'));
	}

	public doSelect(id: string) {
		this.showConfiguration = (id === 'T4');
	}

	public doShowSettings() {
	}

	public doChangePassword() {
		const parameters: ChangePasswordDialogParameters = ChangePasswordDialog.getParameters();
		parameters.minPasswordStrengthValue = 1;
		parameters.action = (a, b) => this.changePassword(a, b);
		this.dialogService.showDialog(ChangePasswordDialog, parameters)
			.subscribe();
	}

	public doShowAbout() {
	}

	public doLogout() {
		this.apiGlobalsService.bearer = undefined;
		this.router.navigate(['/login']);
	}

	public doPatientSearch() {
		const parameters: PatientMaintenanceDialogParameters = PatientMaintenanceDialog.getParameters();
		this.dialogService.showDialog(PatientMaintenanceDialog, parameters)
			.subscribe();
	}

	public changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
		if (oldPassword === newPassword) {
			this.messagePopupService.showErrorPopup(this.i18nService.instant('ERR_ERROR'), this.i18nService.instant('ERR_IMPOSSIBLE_CHANGE_PASSWORD'));
			return observableOf(false);
		}
		return observableOf(true);
	}

	public doChangeLanguage(language: string) {
		this.localStorage.put('language', language);
		this.i18nService.use(language)
			.subscribe(
				() => window.location.reload(),
				(error) => console.log('Error setting the language.'));

	}

}
