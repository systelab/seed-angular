import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientGrid } from './patient/grid/patient-grid.component';
import { FormsModule } from '@angular/forms';
import { SystelabComponentsModule } from 'systelab-components';

@NgModule({
	declarations: [PatientGrid],
	imports: [CommonModule, FormsModule, SystelabComponentsModule],
	exports: [PatientGrid]
})
export class ComponentsModule {}
