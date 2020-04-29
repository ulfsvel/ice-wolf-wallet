import {
    authenticateUser,
    getUserWallets, getWalletWalletBalance,
    registerUser,
    resetPassword,
    resetPasswordRequest, updateUser
} from "../../helpers/api-calls";
import {
    UserLoginFormData,
    UserOptionsFormData,
    UserRegisterFormData,
    UserResetFormData,
    UserResetRequestFormData
} from "../../types/User";
import {
    failLoginForm, failOptionsForm,
    failRegisterForm, failResetForm,
    failResetRequestForm,
    loginUser, logoutUser, setWallets,
    submitLoginForm, submitOptionsForm,
    submitRegisterForm, submitResetForm,
    submitResetRequestForm,
    successLoginForm, successOptionsForm,
    successRegisterForm, successResetForm,
    successResetRequestForm,
} from "../actions/users";
import {clearStorage, setAccessToken} from "../../helpers/local-storage";
import {resetApp} from "../actions/app";
import {State} from "../store";
import Wallet, {WalletType} from "../../types/Wallet";
import {resetWallet, setWalletState} from "../actions/wallet";
import {createWalletState} from "../reducers/wallet";

export const loginUserThunk = (userLoginFormData: UserLoginFormData) => (dispatch: (arg0: any) => void) => {
    dispatch(submitLoginForm());
    authenticateUser(userLoginFormData)
        .then(response => response.accessToken)
        .then(async (accessToken) => {
            dispatch(successLoginForm());
            dispatch(loginUser({
                accessToken: accessToken,
                wallets: await getUserWallets(accessToken)
            }));
            setAccessToken(accessToken);
        })
        .catch(() => {
            dispatch(failLoginForm())
        });
};

export const logoutUserThunk = () => (dispatch: (arg0: any) => void) => {
    clearStorage();
    dispatch(logoutUser());
    dispatch(resetApp());
    dispatch(resetWallet());
};

export const registerUserThunk = (userRegisterFormData: UserRegisterFormData) => (dispatch: (arg0: any) => void) => {
    if (userRegisterFormData.password !== userRegisterFormData.passwordConfirm) {
        dispatch(failRegisterForm());
        return;
    }

    dispatch(submitRegisterForm());
    registerUser(userRegisterFormData).then(() => {
        dispatch(successRegisterForm())
    }).catch(() => {
        dispatch(failRegisterForm())
    });
};

export const resetUserPasswordRequestThunk = (userResetFormData: UserResetRequestFormData) => (dispatch: (arg0: any) => void) => {
    dispatch(submitResetRequestForm());
    resetPasswordRequest(userResetFormData).then(() => {
        dispatch(successResetRequestForm())
    }).catch(() => {
        dispatch(failResetRequestForm())
    });
};


export const resetUserPasswordThunk = (userResetFormData: UserResetFormData) => (dispatch: (arg0: any) => void) => {
    if (userResetFormData.password !== userResetFormData.passwordConfirm) {
        dispatch(failResetForm());
        return;
    }

    dispatch(submitResetForm());
    resetPassword(userResetFormData).then(() => {
        dispatch(successResetForm())
    }).catch(() => {
        dispatch(failResetForm())
    });
};

export const updateUserThunk = (userOptionsFormData: UserOptionsFormData) => (dispatch: (arg0: any) => void, getState: () => State) => {
    if (userOptionsFormData.password !== "" && userOptionsFormData.password !== userOptionsFormData.passwordConfirm) {
        dispatch(failOptionsForm());
        return;
    }

    const user = getState().user.appUser;
    if (user === null) {
        dispatch(failOptionsForm());
        return;
    }

    dispatch(submitOptionsForm());
    updateUser(user.accessToken, userOptionsFormData).then(() => {
        dispatch(successOptionsForm())
    }).catch(() => {
        dispatch(failOptionsForm())
    });
};

export const updateWalletBalanceThunk = (type: WalletType, publicAddress: string) => (dispatch: (arg0: any) => void, getState: () => State) => {

    const user = getState().user.appUser;
    if (user === null) {
        return;
    }

    const walletState = getState().wallet.states[type][publicAddress] || createWalletState();
    dispatch(setWalletState(type, publicAddress, {
        ...walletState,
        getBalance: {
            ...walletState.getBalance,
            wasSubmitted: true,
            isSubmitting: true
        }
    }));
    getWalletWalletBalance(user.accessToken, publicAddress, type).then((balance: string) => {
        const wallets = user.wallets.map((wallet: Wallet) => {
            if (wallet.walletType === type && wallet.publicAddress === publicAddress) {
                return {
                    ...wallet,
                    lastKnownBalance: balance
                } as Wallet
            }
            return wallet
        });
        dispatch(setWallets(wallets));
        dispatch(setWalletState(type, publicAddress, {
            ...walletState,
            getBalance: {
                ...walletState.getBalance,
                wasSubmitted: true,
                isSubmitting: false,
                isSuccess: true
            }
        }));
    }).catch(() => {
        dispatch(setWalletState(type, publicAddress, {
            ...walletState,
            getBalance: {
                ...walletState.getBalance,
                wasSubmitted: true,
                isSubmitting: false,
                isSuccess: false
            }
        }));
    });
};