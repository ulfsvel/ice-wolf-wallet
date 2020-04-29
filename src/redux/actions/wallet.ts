import {RESET_WALLET, SET_WALLET_STATE} from "../raw-actions/wallet";
import {WalletState} from "../reducers/wallet";
import {WalletType} from "../../types/Wallet";

export function setWalletState(walletType: WalletType, address: string, state: WalletState) {
    return {
        type: SET_WALLET_STATE,
        walletType,
        address,
        state
    }
}

export function resetWallet() {
    return {
        type: RESET_WALLET,
    }
}