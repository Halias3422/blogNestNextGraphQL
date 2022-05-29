export type Author = {
	id: string;
	login: string;
};

export type UserSubmit = {
	login: string;
	password: string;
};

export type CurrProfile = {
	isLoggedIn: boolean;
	login: string | null;
	id: string | null;
	sessionToken: string | null;
	sessionChecked: boolean;
};
