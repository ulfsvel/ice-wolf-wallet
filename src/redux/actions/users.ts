import User, {
    UserLoginFormData, UserOptionsFormData,
    UserRegisterFormData, UserResetFormData,
    UserResetRequestFormData
} from "../../types/User";
import {
    FAIL_LOGIN_FORM, FAIL_OPTIONS_FORM,
    FAIL_REGISTER_FORM,
    FAIL_RESET_FORM, FAIL_RESET_REQUEST_FORM,
    LOGIN_USER, LOGOUT_USER,
    SUBMIT_LOGIN_FORM, SUBMIT_OPTIONS_FORM,
    SUBMIT_REGISTER_FORM,
    SUBMIT_RESET_FORM, SUBMIT_RESET_REQUEST_FORM,
    SUCCESS_LOGIN_FORM, SUCCESS_OPTIONS_FORM,
    SUCCESS_REGISTER_FORM,
    SUCCESS_RESET_FORM, SUCCESS_RESET_REQUEST_FORM,
    UPDATE_LOGIN_FORM, UPDATE_OPTIONS_FORM,
    UPDATE_REGISTER_FORM,
    UPDATE_RESET_FORM, UPDATE_RESET_REQUEST_FORM
} from "../raw-actions/user";

export function updateLoginForm(data: UserLoginFormData) {
    return {
        type: UPDATE_LOGIN_FORM,
        data
    }
}

export function updateRegisterForm(data: UserRegisterFormData) {
    return {
        type: UPDATE_REGISTER_FORM,
        data
    }
}

export function updateResetRequestForm(data: UserResetRequestFormData) {
    return {
        type: UPDATE_RESET_REQUEST_FORM,
        data
    }
}

export function updateResetForm(data: UserResetFormData) {
    return {
        type: UPDATE_RESET_FORM,
        data
    }
}

export function updateOptionsForm(data: UserOptionsFormData) {
    return {
        type: UPDATE_OPTIONS_FORM,
        data
    }
}

export function submitLoginForm() {
    return {
        type: SUBMIT_LOGIN_FORM
    }
}

export function submitRegisterForm() {
    return {
        type: SUBMIT_REGISTER_FORM
    }
}

export function submitResetRequestForm() {
    return {
        type: SUBMIT_RESET_REQUEST_FORM
    }
}

export function submitResetForm() {
    return {
        type: SUBMIT_RESET_FORM
    }
}

export function submitOptionsForm() {
    return {
        type: SUBMIT_OPTIONS_FORM
    }
}

export function failLoginForm(message: string | null = null) {
    return {
        type: FAIL_LOGIN_FORM,
        message
    }
}

export function failRegisterForm(message: string | null = null) {
    return {
        type: FAIL_REGISTER_FORM,
        message
    }
}

export function failResetRequestForm(message: string | null = null) {
    return {
        type: FAIL_RESET_REQUEST_FORM,
        message
    }
}

export function failResetForm(message: string | null = null) {
    return {
        type: FAIL_RESET_FORM,
        message
    }
}

export function failOptionsForm(message: string | null = null) {
    return {
        type: FAIL_OPTIONS_FORM,
        message
    }
}

export function successLoginForm() {
    return {
        type: SUCCESS_LOGIN_FORM,
    }
}

export function successRegisterForm() {
    return {
        type: SUCCESS_REGISTER_FORM,
    }
}

export function successResetRequestForm() {
    return {
        type: SUCCESS_RESET_REQUEST_FORM,
    }
}

export function successResetForm() {
    return {
        type: SUCCESS_RESET_FORM,
    }
}

export function successOptionsForm() {
    return {
        type: SUCCESS_OPTIONS_FORM,
    }
}

export function loginUser(user: User) {
    return {
        type: LOGIN_USER,
        user
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
    }
}