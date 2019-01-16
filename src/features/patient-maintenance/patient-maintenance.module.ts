import { NgModule } from '@angular/core';
import { DialogService, MessagePopupService } from 'systelab-components/widgets/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SystelabTranslateModule } from 'systelab-translate';
import { SystelabComponentsModule } from 'systelab-components';
import { SystelabLoginModule } from 'systelab-login';
import { PatientMaintenanceDialog } from './patient-maintenance-dialog.component';
import { PatientDialog } from './patient-detail-dialog/patient-dialog.component';
import { ComponentsModule } from '@components/components.module';

@NgModule({
	imports:         [
		FormsModule,
		CommonModule,
		SystelabTranslateModule,
		SystelabLoginModule,
		SystelabComponentsModule,
		ComponentsModule],
	declarations:    [
		PatientMaintenanceDialog,
		PatientDialog
	],
	exports:         [],
	entryComponents: [
		PatientMaintenanceDialog,
		PatientDialog
	],
	providers:       [
		MessagePopupService,
		DialogService,
	],
})
export class PatientMaintenanceModule {
}