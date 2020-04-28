import User, {
    AuthResponse,
    UserLoginFormData, UserOptionsFormData,
    UserRegisterFormData, UserResetFormData, UserResetRequestFormData
} from "../types/User";
import axios from "axios";
import Wallet from "../types/Wallet";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : null;

let authenticateUserFunction, registerUserFunction, resetPasswordRequestFunction, getUserWalletsFunction,
    resetPasswordFunction, updateUserFunction;

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

} else {
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
        const config = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        const response = await axios.get(apiUrl + 'api/user/getWallets', config);
        return response.data
    };

    resetPasswordFunction = async (data: UserResetFormData): Promise<void> => {
        await axios.post(apiUrl + 'api/public/user/resetForm', {
            token: data.resetToken,
            password: data.password
        });
    };

    updateUserFunction = async (accessToken: string, data: UserOptionsFormData): Promise<void> => {
        const config = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        await axios.post(apiUrl + 'api/user/update', data, config);
    };
}

export const authenticateUser = authenticateUserFunction;
export const registerUser = registerUserFunction;
export const resetPasswordRequest = resetPasswordRequestFunction;
export const getUserWallets = getUserWalletsFunction;
export const resetPassword = resetPasswordFunction;
export const updateUser = updateUserFunction;