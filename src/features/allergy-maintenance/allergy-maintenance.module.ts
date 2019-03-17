import { NgModule } from '@angular/core';
import { DialogService, MessagePopupService } from 'systelab-components/widgets/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SystelabTranslateModule } from 'systelab-translate';
import { SystelabComponentsModule } from 'systelab-components';
import { ComponentsModule } from '@components/components.module';
import { AllergyMaintenanceComponent } from './allergy-maintenance.component';
import { AllergyDialog } from '@features/allergy-maintenance/alergy-detail-dialog/allergy-dialog.component';

@NgModule({
	imports:         [
		FormsModule,
		CommonModule,
		SystelabTranslateModule,
		SystelabComponentsModule,
		ComponentsModule],
	declarations:    [
		AllergyMaintenanceComponent,
		AllergyDialog],
	exports:         [
		AllergyMaintenanceComponent],
	entryComponents: [
		AllergyDialog],
	providers:       [
		MessagePopupService,
		DialogService,
	],
})
export class AllergyMaintenanceModule {
}