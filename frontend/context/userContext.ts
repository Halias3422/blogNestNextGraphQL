import { createContext, Dispatch, SetStateAction } from "react";
import { CurrProfile } from "../types/currProfile";

const currProfileEmpty: CurrProfile = {
    isLoggedIn: false,
    login: null,
};

// export const CurrProfileContext = createContext<
//     [CurrProfile, Dispatch<SetStateAction<CurrProfile>>] | null
// >(null);

export const CurrProfileContext = createContext<[CurrProfile, Dispatch<SetStateAction<CurrProfile>>]>({} as any);
