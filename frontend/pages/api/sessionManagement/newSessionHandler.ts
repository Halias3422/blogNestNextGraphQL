import { CurrProfile } from '../../../types/user';

export const setNewSession = async (
	userId: string,
	setUserSessionToken: any
): Promise<string> => {
	const { data } = await setUserSessionToken({
		variables: { userId: userId }
	}).catch(() => {});
	return data.setUserSessionToken;
};
