import {RESET_WALLET, SET_WALLET, SET_WALLETS, WalletTypes} from "../raw-actions/wallet";
import Wallet, {WalletType} from "../../types/Wallet";


export interface WalletState {
    getBalance: {
        wasSubmitted: boolean
        isSuccess: boolean
        isSubmitting: boolean
    }
}


export interface WalletsState {
    wallets: Record<WalletType, Record<string, Wallet>>
}

const initialState: WalletsState = {
    wallets: {
        [WalletType.ETH]: {},
        [WalletType.BTC]: {}
    }
};

export default function walletsReducer(state = initialState, action: WalletTypes): WalletsState {
    switch (action.type) {
        case SET_WALLET:
            return {
                ...state,
                wallets: {
                    ...state.wallets,
                    [action.walletType]: {
                        ...state.wallets[action.walletType],
                        [action.address]: action.wallet
                    }
                }
            };
        case SET_WALLETS:
            return {
                ...state,
                wallets: action.wallets
            };
        case RESET_WALLET:
            return initialState;
        default:
            return state
    }
}