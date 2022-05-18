import { createContext, Dispatch, SetStateAction } from "react";
import { CurrProfile } from "../types/currProfile";

export const CurrProfileContext = createContext<[CurrProfile, Dispatch<SetStateAction<CurrProfile>>]>({} as any);
