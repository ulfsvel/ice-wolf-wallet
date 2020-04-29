import {WalletState} from "../reducers/wallet";
import {WalletType} from "../../types/Wallet";

export const RESET_WALLET = "RESET_WALLET";
export const SET_WALLET_STATE = "SET_WALLET_STATE";

export interface SetWalletState {
    type: typeof SET_WALLET_STATE,
    walletType: WalletType
    address: string,
    state: WalletState
}

export interface ResetWallet {
    type: typeof RESET_WALLET
}

export type WalletTypes =
    | SetWalletState
    | ResetWallet
