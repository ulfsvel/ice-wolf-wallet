import Wallet, {StalesWallet, WalletState, WalletType} from "../../types/Wallet";
import {State} from "../store";
import {setWallet} from "../actions/wallet";
import {getWalletWalletBalance} from "../../helpers/api-calls";

export const createWalletState = (): WalletState => {
    return {
        getBalance: {
            wasSubmitted: false,
            isSuccess: true,
            isSubmitting: false
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
            state: createWalletState()
        } as Wallet
    }
    return result;
};

export const updateWalletBalanceThunk = (type: WalletType, publicAddress: string) => (dispatch: (arg0: any) => void, getState: () => State) => {

    const user = getState().user.appUser;
    if (user === null) {
        return;
    }

    const wallet = getState().wallet.wallets[type][publicAddress] || createWalletState();
    dispatch(setWallet(type, publicAddress, {
        ...wallet,
        state: {
            ...wallet.state,
            getBalance: {
                ...wallet.state.getBalance,
                wasSubmitted: true,
                isSubmitting: true
            }
        }
    }));
    getWalletWalletBalance(user.accessToken, publicAddress, type).then((balance: string) => {
        dispatch(setWallet(type, publicAddress, {
            ...wallet,
            lastKnownBalance: balance,
            state: {
                ...wallet.state,
                getBalance: {
                    ...wallet.state.getBalance,
                    wasSubmitted: true,
                    isSubmitting: false,
                    isSuccess: true
                }
            }

        }));
    }).catch(() => {
        dispatch(setWallet(type, publicAddress, {
            ...wallet,
            state: {
                ...wallet.state,
                getBalance: {
                    ...wallet.state.getBalance,
                    wasSubmitted: true,
                    isSubmitting: false,
                    isSuccess: false
                }
            }
        }));
    });
};