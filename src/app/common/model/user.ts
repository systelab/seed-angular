export interface User {
	id?: number;
	surname?: string;
	name?: string;
	login?: string;
	password?: string;
	role?: User.RoleEnum;
}

export namespace User {
	export type RoleEnum = 'USER' | 'ADMIN';
}


