import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ApiGlobalsService } from './globals.service';

@NgModule({
	imports:      [],
	declarations: [],
	exports:      []
})
export class GlobalsModule {
	public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule:  GlobalsModule,
			providers: [
				{provide: ApiGlobalsService, useClass: ApiGlobalsService}
			]
		};
	}
}
