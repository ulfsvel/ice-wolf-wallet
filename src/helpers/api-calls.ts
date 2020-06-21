import {
    AuthResponse,
    UserLoginFormData, UserOptionsFormData,
    UserRegisterFormData, UserResetFormData, UserResetRequestFormData
} from "../types/User";
import axios, {AxiosRequestConfig} from "axios";
import Wallet, {
    CreateWalletFormState,
    CreateWalletResult,
    StalesWallet,
    WalletSecurityTypeResult,
    WalletType
} from "../types/Wallet";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : 'http://localhost/';

const createConfig = (token: string): AxiosRequestConfig => {
    return {
        headers: {Authorization: `Bearer ${token}`}
    }
};

export const authenticateUser = async (data: UserLoginFormData): Promise<AuthResponse> => {
    const response = await axios.post(apiUrl + 'api/public/authenticate', data);
    return response.data
};

export const registerUser = async (data: UserRegisterFormData): Promise<void> => {
    return await axios.post(apiUrl + 'api/public/user/create', data);
};

export const resetPasswordRequest = async (data: UserResetRequestFormData): Promise<void> => {
    await axios.post(apiUrl + 'api/public/user/resetToken', data);
};

export const getUserWallets = async (accessToken: string): Promise<Array<StalesWallet>> => {
    const response = await axios.get(apiUrl + 'api/user/getWallets', createConfig(accessToken));
    return response.data
};

export const resetPassword = async (data: UserResetFormData): Promise<void> => {
    await axios.post(apiUrl + 'api/public/user/reset', {
        token: data.resetToken,
        password: data.password
    });
};

export const updateUser = async (accessToken: string, data: UserOptionsFormData): Promise<void> => {
    await axios.post(apiUrl + 'api/user/update', data, createConfig(accessToken));
};

export const requestConfirmToken = async (accessToken: string): Promise<void> => {
    await axios.post(apiUrl + 'api/user/requestConfirmToken', null, createConfig(accessToken));
};

export const getWalletWalletBalance = async (accessToken: string, publicAddress: string, type: WalletType): Promise<string> => {
    const urlType = type.toString().toLowerCase();
    const response = await axios.post(apiUrl + `api/${urlType}/getWalletBalance`, {publicAddress}, createConfig(accessToken));
    return response.data.balance;
};

export const transferFunds = async (accessToken: string, wallet: Wallet): Promise<string> => {
    const data = {
        credentials: {} as Record<string, any>,
        publicAddress: wallet.publicAddress,
        to: wallet.state.sendFundsForm.data.to,
        amount: wallet.state.sendFundsForm.data.amount
    };
    for (const field in wallet.state.sendFundsForm.data) {
        if (!(['to', 'amount'].includes(field))) {
            // @ts-ignore
            data.credentials[field] = wallet.state.sendFundsForm.data[field];
        }
    }

    const urlType = wallet.walletType.toString().toLowerCase();
    const response = await axios.post(apiUrl + `api/${urlType}/transferFunds`, data, createConfig(accessToken));
    return response.data.transactionIdentifier;
};

export const changeSecurityType = async (accessToken: string, wallet: Wallet): Promise<WalletSecurityTypeResult> => {
    const data = {
        publicAddress: wallet.publicAddress,
        currentCredentials: wallet.state.changeSecurityType.data.currentCredentials,
        newCredentials: wallet.state.changeSecurityType.data.newCredentials,
        newSecurityType: wallet.state.changeSecurityType.data.newSecurityType
    };

    const urlType = wallet.walletType.toString().toLowerCase();
    const response = await axios.post(apiUrl + `api/${urlType}/updateWalletSecurity`, data, createConfig(accessToken));
    return response.data.auxiliaryData
};

export const recoverWallet = async (accessToken: string, wallet: Wallet): Promise<WalletSecurityTypeResult> => {
    const data = {
        publicAddress: wallet.publicAddress,
        recoverCredentials: wallet.state.recoverWallet.data.recoverCredentials,
        newCredentials: wallet.state.recoverWallet.data.newCredentials,
        newSecurityType: wallet.state.recoverWallet.data.newSecurityType
    };

    const urlType = wallet.walletType.toString().toLowerCase();
    const response = await axios.post(apiUrl + `api/${urlType}/recoverWallet`, data, createConfig(accessToken));
    return response.data.auxiliaryData
};

export const createWallet = async (accessToken: string, form: CreateWalletFormState): Promise<CreateWalletResult> => {
    const data = {
        credentials: form.data.securityTypeData,
        securityType: form.data.securityType
    };

    const urlType = form.data.type.toString().toLowerCase();
    const response = await axios.post(apiUrl + `api/${urlType}/createWallet`, data, createConfig(accessToken));
    return response.data
};
