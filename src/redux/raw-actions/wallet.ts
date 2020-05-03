import Wallet, {CreateWalletFormState, WalletType} from "../../types/Wallet";

export const RESET_WALLET = "RESET_WALLET";
export const SET_WALLET = "SET_WALLET";
export const SET_WALLETS = "SET_WALLETS";

export interface SetWallet {
    type: typeof SET_WALLET,
    wallet: Wallet
}

export interface ResetWallet {
    type: typeof RESET_WALLET
}

export interface SetWallets {
    type: typeof SET_WALLETS,
    wallets: Record<WalletType, Record<string, Wallet>>
}

export const SET_CREATE_WALLET_FORM = 'SET_CREATE_WALLET_FORM';

export interface SetCreateWalletFormState {
    type: typeof SET_CREATE_WALLET_FORM,
    form: CreateWalletFormState
}

export type WalletTypes =
    | SetWallet
    | ResetWallet
    | SetWallets
    | SetCreateWalletFormState
    ;

