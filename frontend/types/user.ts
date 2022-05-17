import { Article } from "./article";

export type UserSubmit = {
    login: string,
    password: string,
};

export type ConnectedUser = {
    login: string,
    createdAccountOn: Date,
    articlesCreated: Article[],
}

export type UserLogin = {
    login: string,
}