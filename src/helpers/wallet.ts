import {WalletType} from "../types/Wallet";

export const getCurrencyByWalletType = (walletType: WalletType): string => {
    switch (walletType) {
        case WalletType.BTC:
            return "SAT";
        case WalletType.ETH:
            return "WEI"
    }
};