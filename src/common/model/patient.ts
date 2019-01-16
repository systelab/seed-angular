import { Address } from './address';

export interface Patient {
	id?: string;
	surname?: string;
	name?: string;
	email?: string;
	medicalNumber?: string;
	dob?: Date;
	address?: Address;

}


