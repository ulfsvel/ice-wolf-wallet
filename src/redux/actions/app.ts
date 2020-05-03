import {RESET_APP, SET_AUTH_TAB, SET_IS_INITIALISED, SET_OPTIONS_TAB, SET_WALLET_TAB} from "../raw-actions/app";

export function setIsInitialised() {
    return {
        type: SET_IS_INITIALISED,
    }
}

export function setWalletTab(tab: number) {
    return {
        type: SET_WALLET_TAB,
        tab
    }
}

export function setAuthTab(tab: number) {
    return {
        type: SET_AUTH_TAB,
        tab
    }
}

export function setOptionsTab(tab: number) {
    return {
        type: SET_OPTIONS_TAB,
        tab
    }
}

export function resetApp() {
    return {
        type: RESET_APP,
    }
}