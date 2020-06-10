import Wallet, {
    CreateWalletFormState,
    CreateWalletResult,
    StalesWallet,
    TransferFoundsFormData,
    WalletDecryptCredentials,
    WalletEncryptCredentials, WalletRecoverCredentials,
    WalletSecurityType,
    WalletSecurityTypeResult,
    WalletState,
    WalletType
} from "../../types/Wallet";
import {State} from "../store";
import {setCreateWalletFormState, setWallet, setWallets} from "../actions/wallet";
import {
    changeSecurityType,
    createWallet,
    getWalletWalletBalance,
    recoverWallet,
    transferFounds
} from "../../helpers/api-calls";

const getRecoverFormDataByType = (type: WalletSecurityType): WalletRecoverCredentials => {
    switch (type) {
        case WalletSecurityType.ShamirBasic:
            return {
                confirmationCode: ''
            };
        default:
            return {};
    }
};

const getDecryptFormDataByType = (type: WalletSecurityType): WalletDecryptCredentials => {
    switch (type) {
        case WalletSecurityType.AesBasic:
            return {
                password: ''
            };
        case WalletSecurityType.ShamirBasic:
            return {
                password: ''
            };
        case WalletSecurityType.ShamirAdvanced:
            return {

                shares: []
            };
        default:
        case WalletSecurityType.Paper:
            return {
                privateKey: ''
            };
    }
};

const getTransferFoundsFormDataByType = (type: WalletSecurityType): TransferFoundsFormData => {
    return {
        ...getDecryptFormDataByType(type),
        to: '',
        amount: ''
    }
};

export const getEncryptFormDataByType = (type: WalletSecurityType): WalletEncryptCredentials => {
    switch (type) {
        case WalletSecurityType.AesBasic:
            return {
                password: ''
            };
        case WalletSecurityType.ShamirBasic:
            return {
                password: ''
            };
        case WalletSecurityType.ShamirAdvanced:
            return {
                totalShares: 3,
                sharesToRebuild: 1
            };
        default:
        case WalletSecurityType.Paper:
            return {};
    }
};

export const createWalletState = (wallet: StalesWallet): WalletState => {
    return {
        getBalanceForm: {
            wasSubmitted: false,
            isSuccess: true,
            isSubmitting: false
        },
        sendFoundsForm: {
            data: getTransferFoundsFormDataByType(wallet.walletSecurityType),
            state: {
                isSubmitting: false,
                isSuccess: false,
                message: ''
            },
            transactionIdentifier: null
        },
        changeSecurityType: {
            data: {
                currentCredentials: getDecryptFormDataByType(wallet.walletSecurityType),
                newCredentials: getEncryptFormDataByType(WalletSecurityType.Paper),
                newSecurityType: WalletSecurityType.Paper
            },
            state: {
                isSubmitting: false,
                isSuccess: false,
                message: ''
            },
            result: null
        },
        recoverWallet: {
            data: {
                recoverCredentials: getRecoverFormDataByType(wallet.walletSecurityType),
                newCredentials: getEncryptFormDataByType(WalletSecurityType.Paper),
                newSecurityType: WalletSecurityType.Paper
            },
            state: {
                isSubmitting: false,
                isSuccess: false,
                message: ''
            },
            result: null
        },
        isListingTabOpen: false
    }
};

export const fromStatelessWalletArrayToState = (wallets: Array<StalesWallet>): Record<WalletType, Record<string, Wallet>> => {
    const result = {
        [WalletType.ETH]: {},
        [WalletType.BTC]: {}
    } as Record<WalletType, Record<string, Wallet>>;

    for (const wallet of wallets) {
        result[wallet.walletType][wallet.publicAddress] = {
            ...wallet,
            state: createWalletState(wallet)
        } as Wallet
    }
    return result;
};

export const updateWalletBalanceThunk = (type: WalletType, publicAddress: string) => (dispatch: (arg0: any) => void, getState: () => State) => {

    const user = getState().user.appUser;
    if (user === null) {
        return;
    }

    const wallet = getState().wallet.wallets[type][publicAddress];
    dispatch(setWallet({
        ...wallet,
        state: {
            ...wallet.state,
            getBalanceForm: {
                ...wallet.state.getBalanceForm,
                wasSubmitted: true,
                isSubmitting: true
            }
        }
    }));
    getWalletWalletBalance(user.accessToken, publicAddress, type).then((balance: string) => {
        dispatch(setWallet({
            ...wallet,
            lastKnownBalance: balance,
            state: {
                ...wallet.state,
                getBalanceForm: {
                    ...wallet.state.getBalanceForm,
                    wasSubmitted: true,
                    isSubmitting: false,
                    isSuccess: true
                }
            }

        }));
    }).catch(() => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                getBalanceForm: {
                    ...wallet.state.getBalanceForm,
                    wasSubmitted: true,
                    isSubmitting: false,
                    isSuccess: false
                }
            }
        }));
    });
};

export const transferFoundsThunk = (wallet: Wallet) => (dispatch: (arg0: any) => void, getState: () => State) => {

    const user = getState().user.appUser;
    if (user === null) {
        return;
    }

    dispatch(setWallet({
        ...wallet,
        state: {
            ...wallet.state,
            sendFoundsForm: {
                ...wallet.state.sendFoundsForm,
                state: {
                    isSubmitting: true,
                    isSuccess: true,
                    message: '',
                },
                transactionIdentifier: null
            }
        }
    }));
    transferFounds(user.accessToken, wallet).then((transactionIdentifier: string) => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                sendFoundsForm: {
                    data: getTransferFoundsFormDataByType(wallet.walletSecurityType),
                    state: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: 'Operation successful',
                    },
                    transactionIdentifier: transactionIdentifier
                }
            }
        }));
        dispatch(updateWalletBalanceThunk(wallet.walletType, wallet.publicAddress));
        if (Object.keys(getState().wallet.wallets[wallet.walletType]).includes(wallet.state.sendFoundsForm.data.to)) {
            dispatch(updateWalletBalanceThunk(wallet.walletType, wallet.state.sendFoundsForm.data.to));
        }
    }).catch(() => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                sendFoundsForm: {
                    ...wallet.state.sendFoundsForm,
                    state: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: 'Operation failed',
                    }
                }
            }
        }));
    });
};

export const changeSecurityTypeThunk = (wallet: Wallet) => (dispatch: (arg0: any) => void, getState: () => State) => {

    const user = getState().user.appUser;
    if (user === null) {
        return;
    }

    dispatch(setWallet({
        ...wallet,
        state: {
            ...wallet.state,
            changeSecurityType: {
                ...wallet.state.changeSecurityType,
                state: {
                    isSubmitting: true,
                    isSuccess: true,
                    message: '',
                }
            }
        }
    }));
    changeSecurityType(user.accessToken, wallet).then((result: WalletSecurityTypeResult) => {
        dispatch(setWallet({
            ...wallet,
            walletSecurityType: wallet.state.changeSecurityType.data.newSecurityType,
            state: {
                ...wallet.state,
                changeSecurityType: {
                    ...wallet.state.changeSecurityType,
                    data: {
                        currentCredentials: getDecryptFormDataByType(wallet.state.changeSecurityType.data.newSecurityType),
                        newCredentials: getEncryptFormDataByType(WalletSecurityType.Paper),
                        newSecurityType: WalletSecurityType.Paper
                    },
                    result: [WalletSecurityType.Paper, WalletSecurityType.ShamirAdvanced].includes(wallet.state.changeSecurityType.data.newSecurityType) ? result : null,
                    state: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: 'Operation successful',
                    }
                }
            }
        }));
    }).catch(() => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                changeSecurityType: {
                    ...wallet.state.changeSecurityType,
                    state: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: 'Operation failed',
                    }
                }
            }
        }));
    });
};

export const recoverWalletThunk = (wallet: Wallet) => (dispatch: (arg0: any) => void, getState: () => State) => {

    const user = getState().user.appUser;
    if (user === null) {
        return;
    }

    dispatch(setWallet({
        ...wallet,
        state: {
            ...wallet.state,
            recoverWallet: {
                ...wallet.state.recoverWallet,
                state: {
                    isSubmitting: true,
                    isSuccess: true,
                    message: '',
                }
            }
        }
    }));
    recoverWallet(user.accessToken, wallet).then((result: WalletSecurityTypeResult) => {
        dispatch(setWallet({
            ...wallet,
            walletSecurityType: wallet.state.changeSecurityType.data.newSecurityType,
            state: {
                ...wallet.state,
                recoverWallet: {
                    ...wallet.state.recoverWallet,
                    data: {
                        recoverCredentials: getRecoverFormDataByType(wallet.state.changeSecurityType.data.newSecurityType),
                        newCredentials: getEncryptFormDataByType(WalletSecurityType.Paper),
                        newSecurityType: WalletSecurityType.Paper
                    },
                    result: [WalletSecurityType.Paper, WalletSecurityType.ShamirAdvanced].includes(wallet.state.changeSecurityType.data.newSecurityType) ? result : null,
                    state: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: 'Operation successful',
                    }
                }
            }
        }));
    }).catch(() => {
        dispatch(setWallet({
            ...wallet,
            state: {
                ...wallet.state,
                recoverWallet: {
                    ...wallet.state.recoverWallet,
                    state: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: 'Operation failed',
                    }
                }
            }
        }));
    });
};

export const createWalletThunk = (form: CreateWalletFormState) => (dispatch: (arg0: any) => void, getState: () => State) => {

    const user = getState().user.appUser;
    if (user === null) {
        return;
    }

    dispatch(setCreateWalletFormState({
        ...form,
        state: {
            ...form.state,
            isSubmitting: true,
            isSuccess: true,
            message: '',
        }
    }));
    createWallet(user.accessToken, form).then((result: CreateWalletResult) => {
        const wallets = getState().wallet.wallets;

        dispatch(setCreateWalletFormState({
            ...form,
            data: {
                ...form.data,
                securityTypeData: getEncryptFormDataByType(form.data.securityType)
            },
            state: {
                isSubmitting: false,
                isSuccess: true,
                message: 'Operation successful',
            },
            result: {
                data: result.auxiliaryData,
                securityType: form.data.securityType
            }
        }));
        dispatch(setWallets({
            ...wallets,
            [result.wallet.walletType]: {
                ...wallets[result.wallet.walletType],
                [result.wallet.publicAddress]: {
                    ...result.wallet,
                    state: createWalletState(result.wallet)
                } as Wallet
            }
        }));
    }).catch(() => {
        dispatch(setCreateWalletFormState({
            ...form,
            state: {
                ...form.state,
                isSubmitting: false,
                isSuccess: false,
                message: 'Operation failed',
            }
        }));
    });
};
