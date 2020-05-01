export default interface Wallet extends StalesWallet {
    state: WalletState
}

export interface StalesWallet {
    publicAddress: string
    walletSecurityType: WalletSecurityType,
    walletType: WalletType
    lastKnownBalance: string,
}

export enum WalletType {
    ETH = "ETH", BTC = "BTC"
}

export enum WalletSecurityType {
    ShamirBasic = "ShamirBasic", AesBasic = "AesBasic", Paper = "Paper", ShamirAdvanced = "ShamirAdvanced"
}

export interface WalletState {
    getBalance: {
        wasSubmitted: boolean
        isSuccess: boolean
        isSubmitting: boolean
    }
}