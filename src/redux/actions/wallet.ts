import {RESET_WALLET, SET_WALLET, SET_WALLETS} from "../raw-actions/wallet";
import Wallet, {WalletType} from "../../types/Wallet";

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