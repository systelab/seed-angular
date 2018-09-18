import { Observable, of as observableOf } from 'rxjs';
import { Component, HostListener, OnInit } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { ApiGlobalsService } from '../globals/globals.service';
import { Router } from '@angular/router';
import { MessagePopupService } from 'systelab-components/widgets/modal/message-popup/message-popup.service';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { PatientMaintenanceDialog, PatientMaintenanceDialogParameters } from './patient-maintenance/patient-maintenance-dialog.component';
import { ApplicationHeaderMenuEntry } from 'systelab-components/widgets/applicationframe/header/app-header.component';
import { ApplicationSidebarAction, ApplicationSidebarTab } from 'systelab-components/widgets/applicationframe/sidebar/app-sidebar.component';
import { ChangePasswordDialog, ChangePasswordDialogParameters } from 'systelab-login/widgets/change-password-dialog.component';
import { LocalStorageService } from 'systelab-preferences/lib/local-storage.service';

@Component({
	selector:    'main',
	templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
	title = 'Angular Seed Application';

	private frameWidth = 0;
	private frameHeight = 0;

	public userName: string;
	public userFullName: string;
	public hospitalName: string;

	public menu: ApplicationHeaderMenuEntry[] = [];
	public sideactions: ApplicationSidebarAction[] = [];
	public sidetabs: ApplicationSidebarTab[] = [];

	constructor(private router: Router, protected messagePopupService: MessagePopupService,
	            protected dialogService: DialogService, protected i18nService: I18nService,
	            protected apiGlobalsService: ApiGlobalsService, private localStorage: LocalStorageService) {
		this.frameWidth = (window.innerWidth);
		this.frameHeight = (window.innerHeight);
	}

	public ngOnInit() {

		this.userName = 'admin';
		this.userFullName = 'Administrator';
		this.hospitalName = 'Customer name';

		this.setMenu();
		this.setSideTabs();
		this.setSideButtons();
	}

	public setMenu() {

		this.menu = [];
		this.i18nService.get(['COMMON_SETUP', 'COMMON_CHANGE_PASSWORD', 'COMMON_CHANGE_USER', 'COMMON_ABOUT', 'COMMON_TAB_ONE', 'COMMON_TAB_TWO', 'COMMON_TAB_THREE', 'COMMON_TAB_FOUR'])
			.subscribe((res) => {
				this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_ABOUT, false, () => this.doShowAbout()));
				this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_SETUP, false, () => this.doShowSettings()));
				this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_CHANGE_PASSWORD, false, () => this.doChangePassword()));
				this.menu.push(new ApplicationHeaderMenuEntry('', true));
				if (this.frameWidth < 1024) {
					this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_TAB_ONE, false, () => this.doSelect('T1')));
					this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_TAB_TWO, false, () => this.doSelect('T2')));
					this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_TAB_THREE, false, () => this.doSelect('T3')));
					this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_TAB_FOUR, false, () => this.doSelect('T4')));
					this.menu.push(new ApplicationHeaderMenuEntry('', true));
				}
				this.menu.push(new ApplicationHeaderMenuEntry('English', false, () => this.doChangeLanguage('en')));
				this.menu.push(new ApplicationHeaderMenuEntry('Español', false, () => this.doChangeLanguage('es-ES')));
				this.menu.push(new ApplicationHeaderMenuEntry('Italiano', false, () => this.doChangeLanguage('it-IT')));
				this.menu.push(new ApplicationHeaderMenuEntry('한국어', false, () => this.doChangeLanguage('kr-KR')));
				this.menu.push(new ApplicationHeaderMenuEntry('', true));
				this.menu.push(new ApplicationHeaderMenuEntry(res.COMMON_CHANGE_USER, false, () => this.doLogout()));

			});

	}

	public setSideTabs() {
		this.i18nService.get(['COMMON_TAB_ONE', 'COMMON_TAB_TWO', 'COMMON_TAB_THREE', 'COMMON_TAB_FOUR'])
			.subscribe((res) => {
				this.sidetabs.push(new ApplicationSidebarTab('T1', res.COMMON_TAB_ONE, true));
				this.sidetabs.push(new ApplicationSidebarTab('T2', res.COMMON_TAB_TWO, false));
				this.sidetabs.push(new ApplicationSidebarTab('T3', res.COMMON_TAB_THREE, false));
				this.sidetabs.push(new ApplicationSidebarTab('T4', res.COMMON_TAB_FOUR, false));
			});
	}

	public setSideButtons() {
		this.i18nService.get('COMMON_DOCUMENTATION')
			.subscribe((res) => {
				this.sideactions.push(new ApplicationSidebarAction(res, () => this.doShowDocumentation()));
			});
	}

	@HostListener('window:resize', ['$event'])
	public onResize(event) {
		this.frameWidth = (window.innerWidth);
		this.frameHeight = (window.innerHeight);
		this.setMenu();
	}

	public doSelect(id: string) {
		console.log(id);
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

	public doShowDocumentation() {
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
			this.i18nService.get(['ERR_ERROR', 'ERR_IMPOSSIBLE_CHANGE_PASSWORD'])
				.subscribe((res) => {
					this.messagePopupService.showErrorPopup(res.COMMON_ERROR, res.COMMON_IMPOSSIBLE_CHANGE_PASSWORD);
					return observableOf(false);
				});

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
