import User, {
    UserLoginFormData, UserOptionsFormData,
    UserRegisterFormData, UserResetFormData,
    UserResetRequestFormData
} from "../../types/User";
import Wallet from "../../types/Wallet";

export const UPDATE_LOGIN_FORM = "UPDATE_LOGIN_FORM";
export const SUBMIT_LOGIN_FORM = "SUBMIT_LOGIN_FORM";
export const FAIL_LOGIN_FORM = "FAIL_LOGIN_FORM";
export const SUCCESS_LOGIN_FORM = "SUCCESS_LOGIN_FORM";

export const UPDATE_REGISTER_FORM = "UPDATE_REGISTER_FORM";
export const SUBMIT_REGISTER_FORM = "SUBMIT_REGISTER_FORM";
export const FAIL_REGISTER_FORM = "FAIL_REGISTER_FORM";
export const SUCCESS_REGISTER_FORM = "SUCCESS_REGISTER_FORM";

export const UPDATE_RESET_REQUEST_FORM = "UPDATE_RESET_REQUEST_FORM";
export const SUBMIT_RESET_REQUEST_FORM = "SUBMIT_RESET_REQUEST_FORM";
export const FAIL_RESET_REQUEST_FORM = "FAIL_RESET_REQUEST_FORM";
export const SUCCESS_RESET_REQUEST_FORM = "SUCCESS_RESET_REQUEST_FORM";

export const UPDATE_RESET_FORM = "UPDATE_RESET_FORM";
export const SUBMIT_RESET_FORM = "SUBMIT_RESET_FORM";
export const FAIL_RESET_FORM = "FAIL_RESET_FORM";
export const SUCCESS_RESET_FORM = "SUCCESS_RESET_FORM";

export const UPDATE_OPTIONS_FORM = "UPDATE_OPTIONS_FORM";
export const SUBMIT_OPTIONS_FORM = "SUBMIT_OPTIONS_FORM";
export const FAIL_OPTIONS_FORM = "FAIL_OPTIONS_FORM";
export const SUCCESS_OPTIONS_FORM = "SUCCESS_OPTIONS_FORM";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const SET_WALLETS = "SET_WALLETS";

export interface UpdateLoginForm {
    type: typeof UPDATE_LOGIN_FORM
    data: UserLoginFormData
}

export interface SubmitLoginForm {
    type: typeof SUBMIT_LOGIN_FORM
    data: UserLoginFormData
}

export interface FailLoginForm {
    type: typeof FAIL_LOGIN_FORM,
    message: string | null
}

export interface SuccessLoginForm {
    type: typeof SUCCESS_LOGIN_FORM
}

export interface UpdateLoginForm {
    type: typeof UPDATE_LOGIN_FORM
    data: UserLoginFormData
}

export interface UpdateRegisterForm {
    type: typeof UPDATE_REGISTER_FORM
    data: UserRegisterFormData
}

export interface SubmitRegisterForm {
    type: typeof SUBMIT_REGISTER_FORM
    data: UserRegisterFormData
}

export interface FailRegisterForm {
    type: typeof FAIL_REGISTER_FORM,
    message: string | null
}

export interface SuccessRegisterForm {
    type: typeof SUCCESS_REGISTER_FORM
}

export interface UpdateResetForm {
    type: typeof UPDATE_RESET_FORM
    data: UserResetFormData
}

export interface SubmitResetForm {
    type: typeof SUBMIT_RESET_FORM
    data: UserResetFormData
}

export interface FailResetForm {
    type: typeof FAIL_RESET_FORM,
    message: string | null
}

export interface SuccessResetForm {
    type: typeof SUCCESS_RESET_FORM
}

export interface UpdateResetRequestForm {
    type: typeof UPDATE_RESET_REQUEST_FORM
    data: UserResetRequestFormData
}

export interface SubmitResetRequestForm {
    type: typeof SUBMIT_RESET_REQUEST_FORM
    data: UserResetRequestFormData
}

export interface FailResetRequestForm {
    type: typeof FAIL_RESET_REQUEST_FORM,
    message: string | null
}

export interface SuccessResetRequestForm {
    type: typeof SUCCESS_RESET_REQUEST_FORM
}

export interface UpdateOptionsForm {
    type: typeof UPDATE_OPTIONS_FORM
    data: UserOptionsFormData
}

export interface SubmitOptionsForm {
    type: typeof SUBMIT_OPTIONS_FORM
    data: UserOptionsFormData
}

export interface FailOptionsForm {
    type: typeof FAIL_OPTIONS_FORM,
    message: string | null
}

export interface SuccessOptionsForm {
    type: typeof SUCCESS_OPTIONS_FORM
}

export interface LoginUser {
    type: typeof LOGIN_USER,
    user: User
}

export interface LogoutUser {
    type: typeof LOGOUT_USER
}

export interface SetWallets {
    type: typeof SET_WALLETS,
    wallets: Array<Wallet>
}

export type UserTypes =
    | LoginUser
    | LogoutUser

    | SetWallets

    | UpdateLoginForm
    | SubmitLoginForm
    | SuccessLoginForm
    | FailLoginForm

    | UpdateRegisterForm
    | SubmitRegisterForm
    | FailRegisterForm
    | SuccessRegisterForm

    | UpdateResetForm
    | SubmitResetForm
    | FailResetForm
    | SuccessResetForm

    | UpdateResetRequestForm
    | SubmitResetRequestForm
    | FailResetRequestForm
    | SuccessResetRequestForm

    | UpdateOptionsForm
    | SubmitOptionsForm
    | FailOptionsForm
    | SuccessOptionsForm
