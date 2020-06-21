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

export const types = [WalletType.ETH, WalletType.BTC];

export enum WalletSecurityType {
    ShamirBasic = "ShamirBasic", AesBasic = "AesBasic", Paper = "Paper", ShamirAdvanced = "ShamirAdvanced"
}

export const securityTypes = [WalletSecurityType.Paper, WalletSecurityType.ShamirBasic, WalletSecurityType.AesBasic, WalletSecurityType.ShamirAdvanced];


export interface TransferFunds {
    to: string
    amount: string
}

export interface ShamirBasicRecoverCredentials {
    confirmationCode: string
}

export interface ShamirAdvancedRecoverCredentials {
}

export interface AesBasicCredentials {
}

export interface PaperRecoverCredentials {
}

export type WalletRecoverCredentials =
    | ShamirBasicRecoverCredentials
    | ShamirAdvancedRecoverCredentials
    | AesBasicCredentials
    | PaperRecoverCredentials

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

export interface PaperTransferFundsForm extends TransferFunds, PaperDecrypt {

}

export interface ShamirBasicTransferForm extends TransferFunds, ShamirBasicDecrypt {

}

export interface AesBasicTransferForm extends TransferFunds, AesBasicDecrypt {

}

export interface ShamirAdvancedTransferForm extends TransferFunds, ShamirAdvancedDecrypt {

}

export type TransferFundsFormData =
    | PaperTransferFundsForm
    | ShamirBasicTransferForm
    | AesBasicTransferForm
    | ShamirAdvancedTransferForm


export interface ShamirBasicRecover {
    confirmationCode: string
}

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


export interface PaperSecurityResult {
    privateKey: string
}

export interface ShamirAdvancedSecurityResult {
    totalShares: number
    sharesToRebuild: number
    shares: Array<string>
}

export type WalletSecurityTypeResult =
    | PaperSecurityResult
    | ShamirAdvancedSecurityResult
    | null

export interface CreateWalletResult {
    wallet: StalesWallet
    auxiliaryData: WalletSecurityTypeResult
}

export interface WalletState {
    getBalanceForm: {
        wasSubmitted: boolean
        isSuccess: boolean
        isSubmitting: boolean
    }
    sendFundsForm: {
        data: TransferFundsFormData
        state: FormState
        transactionIdentifier: string | null
    }
    changeSecurityType: {
        data: {
            currentCredentials: WalletDecryptCredentials
            newCredentials: WalletEncryptCredentials
            newSecurityType: WalletSecurityType
        }
        state: FormState
        result: WalletSecurityTypeResult
    },
    recoverWallet: {
        data: {
            recoverCredentials: WalletRecoverCredentials
            newCredentials: WalletEncryptCredentials
            newSecurityType: WalletSecurityType
        }
        state: FormState
        result: WalletSecurityTypeResult
    }
    isListingTabOpen: boolean
}

export interface CreateWalletFormState {
    data: {
        type: WalletType
        securityType: WalletSecurityType
        securityTypeData: WalletEncryptCredentials
    }
    state: FormState
    result: {
        data: WalletSecurityTypeResult,
        securityType: WalletSecurityType
    }
}
