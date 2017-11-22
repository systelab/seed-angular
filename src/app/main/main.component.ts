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
import { Observable } from 'rxjs/Observable';

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
              protected apiGlobalsService: ApiGlobalsService) {
    this.frameWidth = (window.innerWidth);
    this.frameHeight = (window.innerHeight);
  }

  public ngOnInit() {

    this.userName = 'admin';
    this.userFullName = 'Administrator';
    this.hospitalName = 'Customer name';

    this.setMenu();

    this.sidetabs.push(new ApplicationSidebarTab('Tab One', true, true));
    this.sidetabs.push(new ApplicationSidebarTab('Tab Two', false, true));
    this.sidetabs.push(new ApplicationSidebarTab('Tab Three', false, true));
    this.sidetabs.push(new ApplicationSidebarTab('Tab Four', false, true));

    this.sideactions.push(new ApplicationSidebarAction(this.i18nService.instant('COMMON_DOCUMENTATION'), () => this.action1()));
  }

  public setMenu() {

    this.menu = [];

    if (this.frameWidth < 1024) {
      this.menu.push(new ApplicationHeaderMenuEntry('Tab One', false, () => this.doSelect(0)));
      this.menu.push(new ApplicationHeaderMenuEntry('Tab Two', false, () => this.doSelect(1)));
      this.menu.push(new ApplicationHeaderMenuEntry('Tab Three', false, () => this.doSelect(2)));
      this.menu.push(new ApplicationHeaderMenuEntry('Tab Four', false, () => this.doSelect(3)));
      this.menu.push(new ApplicationHeaderMenuEntry('', true));

    }

    this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_SETUP'), false, () => this.settings()));
    this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_CHANGE_PASSWORD'), false, () => this.doChangePassword()));
    this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_CHANGE_USER'), false, () => this.logout()));
    this.menu.push(new ApplicationHeaderMenuEntry('', true));
    this.menu.push(new ApplicationHeaderMenuEntry(this.i18nService.instant('COMMON_ABOUT'), false, () => this.about()));
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.frameWidth = (window.innerWidth);
    this.frameHeight = (window.innerHeight);
    this.setMenu();

  }

  public doSelect(tab: number) {
    console.log(tab);
  }

  public settings() {
  }

  public doChangePassword() {
    const parameters: ChangePasswordDialogParameters = ChangePasswordDialog.getParameters();
    parameters.minPasswordStrengthValue = 1;
    parameters.action = (a,b)=>this.changePassword(a,b);
    this.dialogService.showDialog(ChangePasswordDialog, parameters)
      .subscribe();
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    console.log(this.title);
    if (oldPassword === newPassword) {
      this.messagePopupService.showErrorPopup('Impossible to change password', 'uk-width-1-3 uk-height-1-3');

      return Observable.of(false);
    }
    return Observable.of(true);
  }

  public about() {
  }

  public action1() {
  }

  public logout() {
    this.apiGlobalsService.bearer = undefined;
    this.router.navigate(['/login']);
  }

  public patientSearch() {
    const parameters: PatientMaintenanceDialogParameters = PatientMaintenanceDialog.getParameters();
    this.dialogService.showDialog(PatientMaintenanceDialog, parameters)
      .subscribe();
  }

}
