import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PatientService } from './api/patient.service';
import { UserService } from './api/user.service';
import { GlobalsModule } from '../globals/globals.module';

@NgModule({
  imports:      [
    CommonModule,
    HttpModule,
    GlobalsModule],
  declarations: [],
  exports:      []
})
export class ApiModule {
  public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
    return {
      ngModule:  ApiModule,
      providers: [
        {provide: PatientService, useClass: PatientService},
        {provide: UserService, useClass: UserService}]
    };
  }
}
