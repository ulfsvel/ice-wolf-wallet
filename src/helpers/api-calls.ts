import {
    AuthResponse,
    UserLoginFormData, UserOptionsFormData,
    UserRegisterFormData, UserResetFormData, UserResetRequestFormData
} from "../types/User";
import axios, {AxiosRequestConfig} from "axios";
import Wallet, {StalesWallet, WalletType} from "../types/Wallet";

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
    await axios.post(apiUrl + 'api/public/user/resetForm', {
        token: data.resetToken,
        password: data.password
    });
};

export const updateUser = async (accessToken: string, data: UserOptionsFormData): Promise<void> => {
    await axios.post(apiUrl + 'api/user/update', data, createConfig(accessToken));
};

export const getWalletWalletBalance = async (accessToken: string, publicAddress: string, type: WalletType): Promise<string> => {
    const urlType = type.toString().toLowerCase();
    const response = await axios.post(apiUrl + `api/${urlType}/getWalletBalance`, {publicAddress}, createConfig(accessToken));
    return response.data.balance;
};

export const transferFounds = async (accessToken: string, wallet: Wallet): Promise<string> => {
    const data = {
        credentials: {} as Record<string, any>,
        publicAddress: wallet.publicAddress,
        to: wallet.state.sendFoundsForm.data.to,
        amount: wallet.state.sendFoundsForm.data.amount
    };
    for (const field in wallet.state.sendFoundsForm.data) {
        if (!(['to', 'amount'].includes(field))) {
            // @ts-ignore
            data.credentials[field] = wallet.state.sendFoundsForm.data[field];
        }
    }

    const urlType = wallet.walletType.toString().toLowerCase();
    const response = await axios.post(apiUrl + `api/${urlType}/transferFounds`, data, createConfig(accessToken));
    return response.data.balance;
};

export const changeSecurityType = async (accessToken: string, wallet: Wallet): Promise<void> => {
    const data = {
        publicAddress: wallet.publicAddress,
        currentCredentials: wallet.state.changeSecurityType.data.currentCredentials,
        newCredentials: wallet.state.changeSecurityType.data.newCredentials,
        newSecurityType: wallet.state.changeSecurityType.data.newSecurityType
    };

    const urlType = wallet.walletType.toString().toLowerCase();
    await axios.post(apiUrl + `api/${urlType}/updateWalletSecurity`, data, createConfig(accessToken));
};