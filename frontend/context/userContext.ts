import { createContext } from "react";
import { CurrProfile } from "../types/currProfile";

const currProfileEmpty: CurrProfile = {
    isLoggedIn: false,
    login: null,
    setContext: (): void => {},
}
export const CurrProfileContext = createContext<CurrProfile>(currProfileEmpty);