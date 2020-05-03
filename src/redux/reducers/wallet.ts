import {RESET_WALLET, SET_CREATE_WALLET_FORM, SET_WALLET, SET_WALLETS, WalletTypes} from "../raw-actions/wallet";
import Wallet, {CreateWalletFormState, WalletSecurityType, WalletType} from "../../types/Wallet";
import {getEncryptFormDataByType} from "../thunks/wallets";


export interface WalletsState {
    wallets: Record<WalletType, Record<string, Wallet>>
    createWalletForm: CreateWalletFormState
}

const initialState: WalletsState = {
    wallets: {
        [WalletType.ETH]: {},
        [WalletType.BTC]: {}
    },
    createWalletForm: {
        data: {
            type: WalletType.ETH,
            securityType: WalletSecurityType.Paper,
            securityTypeData: getEncryptFormDataByType(WalletSecurityType.Paper)
        },
        state: {
            isSubmitting: false,
            isSuccess: true,
            message: ''
        },
        result: {
            data: null,
            securityType: WalletSecurityType.Paper
        }
    }
};

export default function walletsReducer(state = initialState, action: WalletTypes): WalletsState {
    switch (action.type) {
        case SET_WALLET:
            return {
                ...state,
                wallets: {
                    ...state.wallets,
                    [action.wallet.walletType]: {
                        ...state.wallets[action.wallet.walletType],
                        [action.wallet.publicAddress]: action.wallet
                    }
                }
            };
        case SET_WALLETS:
            return {
                ...state,
                wallets: action.wallets
            };
        case SET_CREATE_WALLET_FORM:
            return {
                ...state,
                createWalletForm: action.form
            };
        case RESET_WALLET:
            return initialState;
        default:
            return state
    }
}