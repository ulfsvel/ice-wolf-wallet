import {WalletSecurityType, WalletType} from "../types/Wallet";

export const getCurrencyByWalletType = (walletType: WalletType): string => {
    switch (walletType) {
        case WalletType.BTC:
            return "SAT";
        case WalletType.ETH:
            return "WEI"
    }
};

export const getWalletType = (type: string): WalletType | null => {
    switch (type) {
        case "ETH":
            return WalletType.ETH;
        case "BTC":
            return WalletType.BTC;
        default:
            return null;
    }
};

export const getWalletSecurityType = (type: string): WalletSecurityType => {
    switch (type) {
        case "AesBasic":
            return WalletSecurityType.AesBasic;
        case "ShamirBasic":
            return WalletSecurityType.ShamirBasic;
        case "ShamirAdvanced":
            return WalletSecurityType.ShamirAdvanced;
        case "Paper":
        default:
            return WalletSecurityType.Paper;
    }
};