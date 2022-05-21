import { gql } from '@apollo/client';
import React, { Dispatch, SetStateAction } from 'react';
import { apiClient } from '../pages/_app';
import { CurrProfile } from '../types/currProfile';
import { UserLogin, UserSubmit } from '../types/user';

const initUserSubmitEvent = (event: React.SyntheticEvent): UserSubmit => {
	event.preventDefault();
	const target = event.target as typeof event.target & {
		login: { value: string };
		password: { value: string };
	};
	const userData: UserSubmit = {
		login: target.login.value,
		password: target.password.value
	};
	return userData;
};

const sendUserCreationRequestToAPI = async (
	userData: UserSubmit
): Promise<UserLogin> => {
	try {
		const { data } = await apiClient.mutate({
			mutation: gql`
				mutation createNewUser($newUser: UserCreationInput!) {
					createNewUser(newUser: $newUser) {
						id
						login
					}
				}
			`,
			variables: {
				newUser: {
					login: userData.login,
					password: userData.password
				}
			}
		});
		return data.createNewUser;
	} catch (e) {
		return <UserLogin>{};
	}
};

const sendUserVerificationRequestToAPI = async (
	userData: UserSubmit
): Promise<UserLogin> => {
	try {
		const { data } = await apiClient.query({
			query: gql`
				query findUserByCredentials(
					$login: String!
					$password: String!
				) {
					findOneUserByCredentials(
						login: $login
						password: $password
					) {
						login
						id
					}
				}
			`,
			variables: {
				login: userData.login,
				password: userData.password
			}
		});
		return data.findOneUserByCredentials;
	} catch (e) {
		return <UserLogin>{};
	}
};

const setNewCurrProfile = (responseAPI: UserLogin) => {
	const loggedInProfile: CurrProfile = {
		isLoggedIn: true,
		login: responseAPI.login,
		id: responseAPI.id
	};
	return loggedInProfile;
};

export const handleUserRegistration = async (
	event: React.SyntheticEvent,
	setError: Dispatch<SetStateAction<boolean>>,
	currProfile: CurrProfile
) => {
	const userData: UserSubmit = initUserSubmitEvent(event);
	const responseAPI = await sendUserCreationRequestToAPI(userData);
	if (responseAPI && responseAPI.id) {
		console.log('ICIII');
		setError(false);
		return setNewCurrProfile(responseAPI);
	} else {
		setError(true);
		return currProfile;
	}
};

export const handleUserConnection = async (
	event: React.FormEvent<HTMLFormElement>,
	setError: Dispatch<SetStateAction<boolean>>,
	currProfile: CurrProfile
) => {
	const userData: UserSubmit = initUserSubmitEvent(event);
	const responseAPI = await sendUserVerificationRequestToAPI(userData);
	if (responseAPI && responseAPI.id) {
		setError(false);
		return setNewCurrProfile(responseAPI);
	} else {
		setError(true);
		return currProfile;
	}
};
