import {FormState} from "./misc";

export default interface User {
    accessToken: string
}

export interface UserResetFormData {
    resetToken: string
    password: string
    passwordConfirm: string
}

export interface UserResetRequestFormData {
    email: string
}

export interface UserLoginFormData extends UserResetRequestFormData {
    password: string
}

export interface UserRegisterFormData extends UserLoginFormData {
    passwordConfirm: string
}

export interface UserOptionsFormData extends UserRegisterFormData {

}

export interface UserResetForm {
    data: UserResetFormData
    form: FormState
}

export interface UserResetRequestForm {
    data: UserResetRequestFormData
    form: FormState
}

export interface UserLoginForm {
    data: UserLoginFormData
    form: FormState
}

export interface UserRegisterForm {
    data: UserRegisterFormData
    form: FormState
}

export interface UserOptionsForm {
    data: UserOptionsFormData
    form: FormState
}

export interface AuthResponse {
    accessToken: string
}