import {WalletSecurityType, WalletType} from "../types/Wallet";

export const isRecoveryAvailable = (walletSecurityType: WalletSecurityType): boolean => {
    return walletSecurityType === WalletSecurityType.ShamirBasic;
};

export const getCurrencyByWalletType = (walletType: WalletType): string => {
    switch (walletType) {
        case WalletType.BTC:
            return "BTC";
        case WalletType.ETH:
            return "ETH"
    }
};

export const getWalletType = (type: string): WalletType | null => {
    switch (type) {
        case "BTC":
            return WalletType.BTC;
        case "ETH":
        default:
            return WalletType.ETH;
    }
};

export const getWalletTypeWithDefault = (type: string): WalletType => {
    const walletType = getWalletType(type);
    if (walletType === null) {
        return WalletType.ETH;
    }
    return walletType;
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

const placeholder = '{:identifier}';
const ethTransactionUrl = process.env.REACT_APP_ETH_TRANSACTION_URL || '';
const btcTransactionUrl = process.env.REACT_APP_BTC_TRANSACTION_URL || '';

export const getTransactionUrl = (type: WalletType, identifier: string) => {
    switch (type) {
        case WalletType.ETH:
            return ethTransactionUrl.replace(placeholder, identifier);
        case WalletType.BTC:
            return btcTransactionUrl.replace(placeholder, identifier);
    }
};

const ethTransactionListUrl = process.env.REACT_APP_ETH_TRANSACTION_LIST_URL || '';
const btcTransactionListUrl = process.env.REACT_APP_BTC_TRANSACTION_LIST_URL || '';

export const getTransactionListUrl = (type: WalletType, identifier: string) => {
    switch (type) {
        case WalletType.ETH:
            return ethTransactionListUrl.replace(placeholder, identifier);
        case WalletType.BTC:
            return btcTransactionListUrl.replace(placeholder, identifier);
    }
};
