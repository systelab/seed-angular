import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientGrid } from './patient/grid/patient-grid.component';
import { AllergyGrid } from './allergy/grid/allergy-grid.component';

import { FormsModule } from '@angular/forms';
import { SystelabComponentsModule } from 'systelab-components';
import { PatientAllergyGrid } from '@components/patient-allergy/grid/patient-allergy-grid.component';
import { AllergyComboBox } from '@components/allergy/combobox/allergy-combobox.component';
import { SystelabTranslateModule } from 'systelab-translate';

@NgModule({
	declarations: [
		PatientGrid,
		AllergyGrid,
		PatientAllergyGrid,
		AllergyComboBox],
	imports:      [
		CommonModule,
		FormsModule,
		SystelabComponentsModule,
		SystelabTranslateModule],
	exports:      [
		PatientGrid,
		AllergyGrid,
		PatientAllergyGrid,
		AllergyComboBox]
})
export class ComponentsModule {
}
