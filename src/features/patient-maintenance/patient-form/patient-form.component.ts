import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '@model/patient';
import { I18nService } from 'systelab-translate/lib/i18n.service';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent {

  @Input() public patient:Patient;
  public active = true;

  constructor( protected i18NService: I18nService) { }

}
