export const SET_IS_INITIALISED = "SET_IS_INITIALISED";
export const SET_WALLET_TAB = "SET_WALLET_TAB";
export const SET_AUTH_TAB = "SET_AUTH_TAB";
export const SET_OPTIONS_TAB = "SET_OPTIONS_TAB";
export const RESET_APP = "RESET_APP";

export interface SetIsInitialised {
    type: typeof SET_IS_INITIALISED
}

export interface SetWalletTab {
    type: typeof SET_WALLET_TAB,
    tab: number
}

export interface SetAuthTab {
    type: typeof SET_AUTH_TAB,
    tab: number
}

export interface SetOptionsTab {
    type: typeof SET_OPTIONS_TAB,
    tab: number
}

export interface ResetApp {
    type: typeof RESET_APP
}

export type AppTypes =
    | SetIsInitialised
    | SetWalletTab
    | SetAuthTab
    | SetOptionsTab
    | ResetApp
