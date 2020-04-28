import {
    getUserWallets,
} from "../../helpers/api-calls";
import {
    loginUser,
} from "../actions/users";
import {State} from "../store";
import {getAccessToken} from "../../helpers/local-storage";
import {setIsInitialised} from "../actions/app";

export const initAppThunk = () => async (dispatch: (arg0: any) => void, getState: () => State) => {
    const state = getState();
    if (state.user.appUser === null && state.user.loginForm.form.isSubmitting === false) {
        const accessToken = getAccessToken();
        if (accessToken) {
            const wallets = await getUserWallets(accessToken);
            dispatch(loginUser({
                accessToken: accessToken,
                wallets
            }));
        }
    }
    dispatch(setIsInitialised());
};