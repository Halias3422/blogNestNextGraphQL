import { gql } from "@apollo/client";
import { createSecureServer } from "http2";
import React, { Dispatch, SetStateAction } from "react";
import { apiClient } from "../pages/_app";
import { User } from "../types/userSubmit";

const initUserSubmitEvent = (event: React.SyntheticEvent): User => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        login: { value: string };
        password: { value: string };
    };
    const userData: User = {
        login: target.login.value,
        password: target.password.value,

    };
    return userData;
}

const sendUserCreationRequestToAPI = async (userData: User): Promise<boolean> => {
    const { data } = await apiClient.mutate({
        mutation: gql`
        mutation createNewUser($input: UserCreationInput!) {
            createUser(input: $input)
        }`,
        variables: {
            input: {
                login: userData.login,
                password: userData.password,
            }
        }
    });
    return data.createUser;
}

const sendUserVerificationRequestToAPI = async (userData: User): Promise<boolean> => {
    const { data } = await apiClient.query({
        query: gql`
        query findUserByCredentials($login: String!, $password: String!) {
            findOneUserByCredentials(login: $login, password: $password)
        }`,
        variables: {
            login: userData.login,
            password: userData.password,
        },
    });
    return data.findOneUserByCredentials;
}

export const handleUserRegistration = async (event: React.SyntheticEvent, setError: Dispatch<SetStateAction<boolean>>) => {
    const userData: User = initUserSubmitEvent(event);
    const responseAPI = await sendUserCreationRequestToAPI(userData);
    if (!responseAPI) {
        setError(true);
    }
}

export const handleUserConnection = async (event: React.FormEvent<HTMLFormElement>, setError: Dispatch<SetStateAction<boolean>>) => {
    const userData: User = initUserSubmitEvent(event);
    const responseAPI = await sendUserVerificationRequestToAPI(userData);
    if (!responseAPI) {
        setError(true);
    }
}