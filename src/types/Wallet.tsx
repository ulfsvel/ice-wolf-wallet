export default interface Wallet {
    publicAddress: string
    walletSecurityType: WalletSecurityType,
    walletType: WalletType
    lastKnownBalance: string
}

export enum WalletType {
    ETH = "ETH", BTC = "BTC"
}

export enum WalletSecurityType {
    ShamirBasic = "ShamirBasic", AesBasic = "AesBasic", Paper = "Paper", ShamirAdvanced = "ShamirAdvanced"
}