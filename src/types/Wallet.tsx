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

export interface ShamirBasic {
    password: string
}

export interface AesBasic {
    password: string
}

export interface ShamirAdvanced {
    shares: Array<string>
}

export interface Paper {
    privateKey: string
}

export interface PaperTransferFoundsForm extends TransferFounds, Paper {

}

export interface ShamirBasicTransferForm extends TransferFounds, ShamirBasic {

}

export interface AesBasicTransferForm extends TransferFounds, AesBasic {

}

export interface ShamirAdvancedTransferForm extends TransferFounds, ShamirAdvanced {

}

export type TransferFoundsFormData =
    | PaperTransferFoundsForm
    | ShamirBasicTransferForm
    | AesBasicTransferForm
    | ShamirAdvancedTransferForm

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
}