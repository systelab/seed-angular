import {Allergy} from './allergy';

export interface PatientAllergy {
	allergy?: Allergy;
	lastOccurrence?: Date;
	assertedDate?: Date;
	note: string;
}

