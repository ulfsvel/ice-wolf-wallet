import Wallet, {WalletType} from "../../types/Wallet";

export const RESET_WALLET = "RESET_WALLET";
export const SET_WALLET = "SET_WALLET";
export const SET_WALLETS = "SET_WALLETS";

export interface SetWallet {
    type: typeof SET_WALLET,
    walletType: WalletType
    address: string,
    wallet: Wallet
}

export interface ResetWallet {
    type: typeof RESET_WALLET
}

export interface SetWallets {
    type: typeof SET_WALLETS,
    wallets: Record<WalletType, Record<string, Wallet>>
}

export type WalletTypes =
    | SetWallet
    | ResetWallet
    | SetWallets

