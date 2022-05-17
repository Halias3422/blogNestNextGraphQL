import { gql } from "@apollo/client";
import { createSecureServer } from "http2";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { CurrProfileContext } from "../context/userContext";
import { apiClient } from "../pages/_app";
import { CurrProfile } from "../types/currProfile";
import { UserLogin, UserSubmit } from "../types/user";

const initUserSubmitEvent = (event: React.SyntheticEvent): UserSubmit => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        login: { value: string };
        password: { value: string };
    };
    const userData: UserSubmit = {
        login: target.login.value,
        password: target.password.value,
    };
    return userData;
};

const sendUserCreationRequestToAPI = async (
    userData: UserSubmit
): Promise<UserLogin> => {
    const { data } = await apiClient.mutate({
        mutation: gql`
            mutation createNewUser($input: UserCreationInput!) {
                createUser(input: $input) {
                    login
                }
            }
        `,
        variables: {
            input: {
                login: userData.login,
                password: userData.password,
            },
        },
    });
    return data.createUser;
};

const sendUserVerificationRequestToAPI = async (
    userData: UserSubmit
): Promise<UserLogin> => {
    const { data } = await apiClient.query({
        query: gql`
            query findUserByCredentials($login: String!, $password: String!) {
                findOneUserByCredentials(login: $login, password: $password) {
                    login
                }
            }
        `,
        variables: {
            login: userData.login,
            password: userData.password,
        },
    });
    return data.findOneUserByCredentials;
};

const setNewCurrProfile = (responseAPI: UserLogin, currProfile: CurrProfile) => {
    const loggedInProfile: CurrProfile = {
        isLoggedIn: true,
        login: responseAPI.login,
        setContext: currProfile.setContext
    }
    return loggedInProfile;
}

export const handleUserRegistration = async (
    event: React.SyntheticEvent,
    setError: Dispatch<SetStateAction<boolean>>,
    currProfile: CurrProfile
) => {
    const userData: UserSubmit = initUserSubmitEvent(event);
    const responseAPI = await sendUserCreationRequestToAPI(userData);
    if (responseAPI) {
        return setNewCurrProfile(responseAPI, currProfile);
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
    if (responseAPI) {
        const newProfile = setNewCurrProfile(responseAPI, currProfile);
        console.log('return new Profile', newProfile);
        return newProfile;
    } else {
        setError(true);
        return currProfile;
    }
};
