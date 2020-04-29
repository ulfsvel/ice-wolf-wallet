import {RESET_WALLET, SET_WALLET_STATE, WalletTypes} from "../raw-actions/wallet";
import {WalletType} from "../../types/Wallet";


export interface WalletState {
    getBalance: {
        wasSubmitted: boolean
        isSuccess: boolean
        isSubmitting: boolean
    }
}

export const createWalletState = (): WalletState => {
    return {
        getBalance: {
            wasSubmitted: false,
            isSuccess: true,
            isSubmitting: false
        }
    }
};


export interface WalletsState {
    states: Record<WalletType, Record<string, WalletState>>
}

const initialState: WalletsState = {
    states: {
        [WalletType.ETH]: {},
        [WalletType.BTC]: {}
    }
};

export default function walletsReducer(state = initialState, action: WalletTypes): WalletsState {
    switch (action.type) {
        case SET_WALLET_STATE:
            return {
                ...state,
                states: {
                    ...state.states,
                    [action.walletType]: {
                        ...state.states[action.walletType],
                        [action.address]: action.state
                    }
                }
            };
        case RESET_WALLET:
            return initialState;
        default:
            return state
    }
}