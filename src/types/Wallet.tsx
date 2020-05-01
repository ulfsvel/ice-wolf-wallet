import {FormState} from "./misc";

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

export interface TransferFounds {
    to: string
    amount: string
}

export interface ShamirBasicDecrypt {
    password: string
}

export interface AesBasicDecrypt {
    password: string
}

export interface ShamirAdvancedDecrypt {
    shares: Array<string>
}

export interface PaperDecrypt {
    privateKey: string
}

export type WalletDecryptCredentials =
    | ShamirBasicDecrypt
    | AesBasicDecrypt
    | ShamirAdvancedDecrypt
    | PaperDecrypt

export interface PaperTransferFoundsForm extends TransferFounds, PaperDecrypt {

}

export interface ShamirBasicTransferForm extends TransferFounds, ShamirBasicDecrypt {

}

export interface AesBasicTransferForm extends TransferFounds, AesBasicDecrypt {

}

export interface ShamirAdvancedTransferForm extends TransferFounds, ShamirAdvancedDecrypt {

}

export type TransferFoundsFormData =
    | PaperTransferFoundsForm
    | ShamirBasicTransferForm
    | AesBasicTransferForm
    | ShamirAdvancedTransferForm


export interface ShamirBasicEncrypt {
    password: string
}

export interface AesBasicEncrypt {
    password: string
}

export interface ShamirAdvancedEncrypt {
    totalShares: number
    sharesToRebuild: number

}

export interface PaperEncrypt {
}

export type WalletEncryptCredentials =
    | ShamirBasicEncrypt
    | AesBasicEncrypt
    | ShamirAdvancedEncrypt
    | PaperEncrypt

export interface WalletState {
    getBalanceForm: {
        wasSubmitted: boolean
        isSuccess: boolean
        isSubmitting: boolean
    }
    sendFoundsForm: {
        data: TransferFoundsFormData
        state: FormState
    }
    changeSecurityType: {
        data: {
            currentCredentials: WalletDecryptCredentials
            newCredentials: WalletEncryptCredentials
            newSecurityType: WalletSecurityType
        }
        state: FormState
        result: Record<string, any>
    }
    isListingTabOpen: boolean
}