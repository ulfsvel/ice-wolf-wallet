import User, {
    AuthResponse,
    UserLoginFormData, UserOptionsFormData,
    UserRegisterFormData, UserResetFormData, UserResetRequestFormData
} from "../types/User";
import axios, {AxiosRequestConfig} from "axios";
import Wallet, {WalletType} from "../types/Wallet";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : null;

let authenticateUserFunction, registerUserFunction, resetPasswordRequestFunction, getUserWalletsFunction,
    resetPasswordFunction, updateUserFunction;

let getWalletWalletBalanceFunction;

interface MockUser extends User {
    email: string
    password: string,
    resetToken: string
}

if (!apiUrl) {

    const users = [{
        email: "user@ulfsvel.com",
        password: "test",
        accessToken: 'token-user@ulfsvel.com',
        resetToken: '',
        wallets: []
    }] as Array<MockUser>;

    authenticateUserFunction = (data: UserLoginFormData): Promise<AuthResponse> => {
        const foundUser = users.find((user: MockUser) => user.email === data.email);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                resolve({accessToken: foundUser.accessToken})
            }
            reject()
        }, 500))
    };

    registerUserFunction = (data: UserRegisterFormData): Promise<void> => {
        const foundUser = users.find((user: MockUser) => user.email === data.email);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                reject("User already exists");
            } else {
                const newUser = {
                    email: data.email,
                    password: data.password,
                    accessToken: 'token-' + data.email,
                    resetToken: '',
                    wallets: []
                } as MockUser;
                users.push(newUser);
                resolve()
            }
        }, 500))
    };

    resetPasswordRequestFunction = (data: UserResetRequestFormData): Promise<void> => {
        const foundUser = users.find((user: MockUser) => user.email === data.email);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (!foundUser) {
                reject("User does not exist");
            } else {
                foundUser.resetToken = 'token-' + data.email;
                resolve()
            }
        }, 500))
    };

    getUserWalletsFunction = (accessToken: string): Promise<Array<Wallet>> => {
        const foundUser = users.find((user: MockUser) => user.accessToken === accessToken);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                resolve(foundUser.wallets)
            }
            reject()
        }, 500))
    };

    resetPasswordFunction = (data: UserResetFormData): Promise<void> => {
        const foundUser = users.find((user: MockUser) => user.resetToken === data.resetToken);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (!foundUser) {
                reject("User does not exist");
            } else {
                foundUser.password = data.password;
                resolve()
            }
        }, 500))
    };

    updateUserFunction = (accessToken: string, data: UserOptionsFormData): Promise<void> => {
        const foundUser = users.find((user: MockUser) => user.accessToken === accessToken);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (!foundUser) {
                reject("User does not exist");
            } else {
                if (data.password !== "") {
                    foundUser.password = data.password;
                }
                if (data.email !== "") {
                    foundUser.email = data.email;
                }
                resolve()
            }
        }, 500))
    };

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    getWalletWalletBalanceFunction = (accessToken: string, publicAddress: string, type: WalletType): Promise<string> => {
        return new Promise((resolve, reject) => setTimeout(() => {
            const foundUser = users.find((user: MockUser) => user.accessToken === accessToken);
            if (!foundUser) {
                reject("User does not exist");
            } else {
                const foundWallet = foundUser.wallets.find((wallet: Wallet) => wallet.publicAddress === publicAddress && wallet.walletType === type);
                if (!foundWallet) {
                    reject("Wallet not found");
                } else {
                    resolve(getRandomInt(9999999999).toString())
                }
            }
        }, 500))
    }

} else {

    const createConfig = (token: string): AxiosRequestConfig => {
        return {
            headers: {Authorization: `Bearer ${token}`}
        }
    };

    authenticateUserFunction = async (data: UserLoginFormData): Promise<AuthResponse> => {
        const response = await axios.post(apiUrl + 'api/public/authenticate', data);
        return response.data
    };

    registerUserFunction = async (data: UserRegisterFormData): Promise<void> => {
        return await axios.post(apiUrl + 'api/public/user/create', data);
    };

    resetPasswordRequestFunction = async (data: UserResetRequestFormData): Promise<void> => {
        await axios.post(apiUrl + 'api/public/user/resetToken', data);
    };

    getUserWalletsFunction = async (accessToken: string): Promise<Array<Wallet>> => {
        const response = await axios.get(apiUrl + 'api/user/getWallets', createConfig(accessToken));
        return response.data
    };

    resetPasswordFunction = async (data: UserResetFormData): Promise<void> => {
        await axios.post(apiUrl + 'api/public/user/resetForm', {
            token: data.resetToken,
            password: data.password
        });
    };

    updateUserFunction = async (accessToken: string, data: UserOptionsFormData): Promise<void> => {
        await axios.post(apiUrl + 'api/user/update', data, createConfig(accessToken));
    };

    getWalletWalletBalanceFunction = async (accessToken: string, publicAddress: string, type: WalletType): Promise<string> => {
        const urlType = type.toString().toLowerCase();
        const response = await axios.post(apiUrl + `api/${urlType}/getWalletBalance`, {publicAddress}, createConfig(accessToken));
        return response.data.balance;
    }
}

export const authenticateUser = authenticateUserFunction;
export const registerUser = registerUserFunction;
export const resetPasswordRequest = resetPasswordRequestFunction;
export const getUserWallets = getUserWalletsFunction;
export const resetPassword = resetPasswordFunction;
export const updateUser = updateUserFunction;
export const getWalletWalletBalance = getWalletWalletBalanceFunction;