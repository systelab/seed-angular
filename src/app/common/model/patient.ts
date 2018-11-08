import { Address } from './address';

export interface Patient {
	id?: string;
	surname?: string;
	name?: string;
	email?: string;
	dob?: Date;
	medicalNumber?: string;
	address?: Address;

}


