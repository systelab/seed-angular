import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SystelabComponentsModule } from 'systelab-components';
import { SystelabTranslateModule } from 'systelab-translate';
import { SystelabPreferencesModule } from 'systelab-preferences';
import { BASE_PATH } from '@api/variables';
import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app.routing';
import { MessagePopupService } from 'systelab-components';
import { DialogService } from 'systelab-components';
import { SystelabLoginModule } from 'systelab-login';
import { EmptyBodyInterceptor } from '@api/empty-body.interceptor';
import { GridHeaderContextMenuComponent } from 'systelab-components';
import { AgGridModule } from 'ag-grid-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GridContextMenuCellRendererComponent } from 'systelab-components';
import { LoginModule } from '@features/login/login.module';
import { PatientMaintenanceModule } from '@features/patient-maintenance/patient-maintenance.module';
import { AllergyMaintenanceModule } from '@features/allergy-maintenance/allergy-maintenance.module';

@NgModule({
	imports:         [
		BrowserModule,
		FormsModule,
		DragDropModule,
		HttpClientModule,
		PatientMaintenanceModule,
		AllergyMaintenanceModule,
		LoginModule,
		SystelabTranslateModule,
		SystelabPreferencesModule,
		SystelabComponentsModule,
		SystelabLoginModule,
		AgGridModule.withComponents([
			GridContextMenuCellRendererComponent,
			GridHeaderContextMenuComponent
		]),
		AppRoutingModule
	],
	declarations:    [
		AppComponent,
		MainComponent
	],
	providers:       [
		{provide: BASE_PATH, useValue: environment.API_BASE_PATH},
		{provide: HTTP_INTERCEPTORS, useClass: EmptyBodyInterceptor, multi: true},
		MessagePopupService,
		DialogService
	],
	entryComponents: [
	],
	bootstrap:       [AppComponent]
})
export class AppModule {
}
