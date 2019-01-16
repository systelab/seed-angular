import { NgModule } from '@angular/core';
import { DialogService } from 'systelab-components/widgets/modal';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { SystelabTranslateModule } from 'systelab-translate';
import { SystelabComponentsModule } from 'systelab-components';
import { MessagePopupService } from 'systelab-components/widgets/modal';
import { SystelabLoginModule } from 'systelab-login';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
	imports: [
		FormsModule,
		SystelabTranslateModule,
		SystelabLoginModule,
		SystelabComponentsModule,
		CommonModule],
	declarations: [
		LoginComponent,
		PageNotFoundComponent
	],
	exports: [
		PageNotFoundComponent
	],
	entryComponents: [
		],
	providers: [
		MessagePopupService,
		DialogService,
	],
})
export class LoginModule {
}