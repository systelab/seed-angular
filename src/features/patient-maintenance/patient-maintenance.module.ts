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
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientAllergyDialog } from '@features/patient-maintenance/patient-allergy-detail-dialog/patient-allergy-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports:         [
		FormsModule,
		CommonModule,
		BrowserAnimationsModule,
		SystelabTranslateModule,
		SystelabLoginModule,
		SystelabComponentsModule,
		ComponentsModule],
	declarations:    [
		PatientMaintenanceDialog,
		PatientDialog,
		PatientAllergyDialog,
		PatientFormComponent
	],
	exports:         [],
	entryComponents: [
		PatientMaintenanceDialog,
		PatientDialog,
		PatientAllergyDialog
	],
	providers:       [
		MessagePopupService,
		DialogService,
	],
})
export class PatientMaintenanceModule {
}