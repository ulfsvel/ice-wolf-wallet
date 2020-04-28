import {AppTypes, RESET_APP, SET_AUTH_TAB, SET_IS_INITIALISED, SET_WALLET_TAB} from "../raw-actions/app";


export interface AppState {
    isInitialised: boolean
    walletTab: number
    authTab: number
}

const initialState: AppState = {
    isInitialised: false,
    walletTab: 0,
    authTab: 0
};

export default function appReducer(state = initialState, action: AppTypes): AppState {
    switch (action.type) {
        case SET_IS_INITIALISED:
            return {
                ...state,
                isInitialised: true
            };
        case SET_WALLET_TAB:
            return {
                ...state,
                walletTab: action.tab
            };
        case SET_AUTH_TAB:
            return {
                ...state,
                authTab: action.tab
            };
        case RESET_APP:
            return initialState;
        default:
            return state
    }
}