import { gql } from '@apollo/client';

export const USER_FIND_ONE_BY_CREDENTIALS = gql`
	query findOneUserByCredentials($login: String!, $password: String!) {
		findOneUserByCredentials(login: $login, password: $password) {
			id
			login
		}
	}
`;
