import { Address } from './address';

export interface Patient {
	id?: number;
	surname?: string;
	name?: string;
	email?: string;
	dob?: Date;
	address?: Address;

}


