import {
    authenticateUser,
    getUserWallets,
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
    loginUser, logoutUser,
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
import {resetWallet, setWallets} from "../actions/wallet";
import Wallet, {StalesWallet} from "../../types/Wallet";
import {createWalletState, fromStatelessWalletArrayToState} from "./wallets";

export const loginUserThunk = (userLoginFormData: UserLoginFormData) => (dispatch: (arg0: any) => void) => {
    dispatch(submitLoginForm());
    authenticateUser(userLoginFormData)
        .then(response => response.accessToken)
        .then(async (accessToken) => {
            dispatch(successLoginForm());
            const wallets = await getUserWallets(accessToken);
            dispatch(setWallets(fromStatelessWalletArrayToState(wallets)));
            dispatch(loginUser({
                accessToken: accessToken
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