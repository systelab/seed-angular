export interface User {
	id?: string;
	surname?: string;
	name?: string;
	login?: string;
	password?: string;
	role?: User.RoleEnum;
}

export namespace User {
	export type RoleEnum = 'USER' | 'ADMIN';
}


