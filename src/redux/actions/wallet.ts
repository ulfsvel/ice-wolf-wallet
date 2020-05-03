import {RESET_WALLET, SET_CREATE_WALLET_FORM, SET_WALLET, SET_WALLETS} from "../raw-actions/wallet";
import Wallet, {CreateWalletFormState, WalletType} from "../../types/Wallet";

export function setWallet(wallet: Wallet) {
    return {
        type: SET_WALLET,
        wallet
    }
}

export function resetWallet() {
    return {
        type: RESET_WALLET,
    }
}

export function setWallets(wallets: Record<WalletType, Record<string, Wallet>>) {
    return {
        type: SET_WALLETS,
        wallets
    }
}

export function setCreateWalletFormState(form: CreateWalletFormState) {
    return {
        type: SET_CREATE_WALLET_FORM,
        form
    }
}