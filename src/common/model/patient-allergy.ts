import { Allergy } from './allergy';


export interface PatientAllergy { 
    allergy?: Allergy;
    lastOccurrence?: string;
    assertedDate?: string;
    note: string;
}

