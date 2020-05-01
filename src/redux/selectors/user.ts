import {State} from "../store";
import Wallet, {WalletType} from "../../types/Wallet";

export const getWalletsByTypeSelector = (state: State, type: WalletType): Array<Wallet> => {
    const wallets = state.wallet.wallets[type];
    return Object.values(wallets);
};