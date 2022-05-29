import { gql } from '@apollo/client';

export const CREATE_NEW_USER_MUTATION = gql`
	mutation createNewUser($newUser: UserCreationInput!) {
		createNewUser(newUser: $newUser) {
			id
			login
		}
	}
`;

export const SET_USER_SESSION_TOKEN = gql`
	mutation setUserSessionToken($userId: ID!) {
		setUserSessionToken(userId: $userId)
	}
`;

export const DELETE_USER_SESSION_TOKEN = gql`
	mutation deleteUserSessionToken($userId: ID!) {
		deleteUserSessionToken(userId: $userId)
	}
`;
