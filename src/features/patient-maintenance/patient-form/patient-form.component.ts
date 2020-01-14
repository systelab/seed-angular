import {Component, Input} from '@angular/core';
import {Patient} from '@model/patient';

@Component({
	selector: 'patient-form',
	templateUrl: './patient-form.component.html'
})
export class PatientFormComponent {

	@Input() public patient: Patient;
	public active = true;

}
