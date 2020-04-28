import {State} from "../store";
import Wallet, {WalletType} from "../../types/Wallet";

export const getWalletsByTypeSelector = (state: State, type: WalletType): Array<Wallet> => {
    if (!state.user.appUser) {
        return [] as Array<Wallet>
    }

    return state.user.appUser.wallets.filter((wallet: Wallet) => wallet.walletType === type);
};