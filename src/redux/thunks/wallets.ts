import Wallet, {
    TransferFoundsFormData,
    StalesWallet,
    WalletSecurityType,
    WalletState,
    WalletType, WalletEncryptCredentials, WalletDecryptCredentials
} from "../../types/Wallet";
import {State} from "../store";
import {setWallet} from "../actions/wallet";
import {changeSecurityType, getWalletWalletBalance, transferFounds} from "../../helpers/api-calls";

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
            }
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
            result: {}
        }
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
                }
            }
        }
    }));
    transferFounds(user.accessToken, wallet).then((balance: string) => {
        dispatch(setWallet({
            ...wallet,
            lastKnownBalance: balance,
            state: {
                ...wallet.state,
                sendFoundsForm: {
                    data: getTransferFoundsFormDataByType(wallet.walletSecurityType),
                    state: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: 'Operation successful',
                    }
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
    changeSecurityType(user.accessToken, wallet).then(() => {
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
                    result: {},
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