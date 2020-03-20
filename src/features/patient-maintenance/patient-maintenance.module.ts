import {NgModule} from '@angular/core';
import {DialogService, MessagePopupService, SystelabComponentsModule} from 'systelab-components';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SystelabTranslateModule} from 'systelab-translate';
import {SystelabLoginModule} from 'systelab-login';
import {PatientMaintenanceDialog} from './patient-maintenance-dialog.component';
import {PatientDialog} from './patient-detail-dialog/patient-dialog.component';
import {ComponentsModule} from '@components/components.module';
import {PatientFormComponent} from './patient-form/patient-form.component';
import {PatientAllergyDialog} from '@features/patient-maintenance/patient-allergy-detail-dialog/patient-allergy-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PatientAllergiesFormComponent} from '@features/patient-maintenance/allergies-form/patient-allergies-form.component';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		BrowserAnimationsModule,
		SystelabTranslateModule,
		SystelabLoginModule,
		SystelabComponentsModule,
		ComponentsModule],
	declarations: [
		PatientMaintenanceDialog,
		PatientDialog,
		PatientAllergyDialog,
		PatientFormComponent,
		PatientAllergiesFormComponent
	],
	exports: [],
	entryComponents: [
		PatientMaintenanceDialog,
		PatientDialog,
		PatientAllergyDialog
	],
	providers: [
		MessagePopupService,
		DialogService,
	],
})
export class PatientMaintenanceModule {
}
