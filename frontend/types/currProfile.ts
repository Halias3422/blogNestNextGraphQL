import { Dispatch, SetStateAction } from "react"
import { ConnectedUser } from "./user"

export type CurrProfile = {
    isLoggedIn: boolean,
    login : string | null,
}