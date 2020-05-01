import User, {
    UserLoginForm,
    UserOptionsForm,
    UserRegisterForm,
    UserResetForm,
    UserResetRequestForm
} from "../../types/User";
import {
    FAIL_LOGIN_FORM,
    FAIL_OPTIONS_FORM,
    FAIL_REGISTER_FORM,
    FAIL_RESET_FORM,
    FAIL_RESET_REQUEST_FORM,
    LOGIN_USER,
    LOGOUT_USER,
    SUBMIT_LOGIN_FORM,
    SUBMIT_OPTIONS_FORM,
    SUBMIT_REGISTER_FORM,
    SUBMIT_RESET_FORM,
    SUBMIT_RESET_REQUEST_FORM,
    SUCCESS_LOGIN_FORM,
    SUCCESS_OPTIONS_FORM,
    SUCCESS_REGISTER_FORM,
    SUCCESS_RESET_FORM,
    SUCCESS_RESET_REQUEST_FORM,
    UPDATE_LOGIN_FORM,
    UPDATE_OPTIONS_FORM,
    UPDATE_REGISTER_FORM,
    UPDATE_RESET_FORM,
    UPDATE_RESET_REQUEST_FORM,
    UserTypes
} from "../raw-actions/user";

export interface UserState {
    appUser: User | null
    loginForm: UserLoginForm
    registerForm: UserRegisterForm,
    resetRequestForm: UserResetRequestForm,
    resetForm: UserResetForm
    optionsForm: UserOptionsForm
}

const emptyLoginForm = {
    data: {
        email: "",
        password: ""
    },
    form: {
        isSubmitting: false,
        isSuccess: true,
        message: ''
    }
};

const emptyRegisterForm = {
    data: {
        email: "",
        password: "",
        passwordConfirm: ""
    },
    form: {
        isSubmitting: false,
        isSuccess: true,
        message: ''
    }
};

const emptyResetRequestForm = {
    data: {
        email: ""
    },
    form: {
        isSubmitting: false,
        isSuccess: true,
        message: ''
    }
};

const emptyResetForm = {
    data: {
        resetToken: "",
        password: "",
        passwordConfirm: ""
    },
    form: {
        isSubmitting: false,
        isSuccess: true,
        message: ''
    }
};

const emptyOptionsForm = {
    data: {
        email: "",
        password: "",
        passwordConfirm: ""
    },
    form: {
        isSubmitting: false,
        isSuccess: true,
        message: ''
    }
};

const initialState: UserState = {
    appUser: null,
    loginForm: emptyLoginForm,
    registerForm: emptyRegisterForm,
    resetRequestForm: emptyResetRequestForm,
    resetForm: emptyResetForm,
    optionsForm: emptyOptionsForm
};

export default function usersReducer(state = initialState, action: UserTypes): UserState {
    switch (action.type) {
        case UPDATE_LOGIN_FORM:
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    data: action.data
                }
            };
        case SUBMIT_LOGIN_FORM:
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    form: {
                        ...state.loginForm.form,
                        isSubmitting: true,
                    }
                }
            };
        case SUCCESS_LOGIN_FORM:
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: "Operation successful"
                    }
                }
            };
        case FAIL_LOGIN_FORM:
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: action.message === null ? "Operation failed" : action.message
                    }
                }
            };
        case UPDATE_REGISTER_FORM:
            return {
                ...state,
                registerForm: {
                    ...state.registerForm,
                    data: action.data
                }
            };
        case SUBMIT_REGISTER_FORM:
            return {
                ...state,
                registerForm: {
                    ...state.registerForm,
                    form: {
                        ...state.registerForm.form,
                        isSubmitting: true
                    }
                }
            };
        case SUCCESS_REGISTER_FORM:
            return {
                ...state,
                registerForm: {
                    ...state.registerForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: "Operation successful"
                    },
                }
            };
        case FAIL_REGISTER_FORM:
            return {
                ...state,
                registerForm: {
                    ...state.registerForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: action.message === null ? "Operation failed" : action.message
                    },
                }
            };
        case UPDATE_RESET_REQUEST_FORM:
            return {
                ...state,
                resetRequestForm: {
                    ...state.resetRequestForm,
                    data: action.data,
                }
            };
        case SUBMIT_RESET_REQUEST_FORM:
            return {
                ...state,
                resetRequestForm: {
                    ...state.resetRequestForm,
                    form: {
                        ...state.resetRequestForm.form,
                        isSubmitting: true,
                    }
                }
            };
        case SUCCESS_RESET_REQUEST_FORM:
            return {
                ...state,
                resetRequestForm: {
                    ...state.resetRequestForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: "Operation successful"
                    },
                }
            };
        case FAIL_RESET_REQUEST_FORM:
            return {
                ...state,
                resetRequestForm: {
                    ...state.resetRequestForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: action.message === null ? "Operation failed" : action.message
                    },
                }
            };
        case UPDATE_RESET_FORM:
            return {
                ...state,
                resetForm: {
                    ...state.resetForm,
                    data: action.data,
                }
            };
        case SUBMIT_RESET_FORM:
            return {
                ...state,
                resetForm: {
                    ...state.resetForm,
                    form: {
                        ...state.resetForm.form,
                        isSubmitting: true,
                    }
                }
            };
        case SUCCESS_RESET_FORM:
            return {
                ...state,
                resetForm: {
                    ...state.resetForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: "Operation successful"
                    },
                }
            };
        case FAIL_RESET_FORM:
            return {
                ...state,
                resetForm: {
                    ...state.resetForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: action.message === null ? "Operation failed" : action.message
                    },
                }
            };
        case UPDATE_OPTIONS_FORM:
            return {
                ...state,
                optionsForm: {
                    ...state.optionsForm,
                    data: action.data,
                }
            };
        case SUBMIT_OPTIONS_FORM:
            return {
                ...state,
                optionsForm: {
                    ...state.optionsForm,
                    form: {
                        ...state.optionsForm.form,
                        isSubmitting: true,
                    }
                }
            };
        case SUCCESS_OPTIONS_FORM:
            return {
                ...state,
                optionsForm: {
                    ...state.optionsForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: true,
                        message: "Operation successful"
                    },
                }
            };
        case FAIL_OPTIONS_FORM:
            return {
                ...state,
                optionsForm: {
                    ...state.optionsForm,
                    form: {
                        isSubmitting: false,
                        isSuccess: false,
                        message: action.message === null ? "Operation failed" : action.message
                    },
                }
            };
        case LOGIN_USER:
            return {
                ...state,
                appUser: action.user,
            };
        case LOGOUT_USER:
            return initialState;
        default:
            return state
    }
}