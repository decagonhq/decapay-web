import {FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED} from "../../action.type";
import {toast} from "react-toastify";


const initialState = {
    token : localStorage.getItem('token') || null,
    data: "", errors: "", loading: false, message: "", isSubmitSuccessful: false
}


const ForgotPasswordReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case FORGOT_PASSWORD:
            return {
                ...state,
                loading: true
            }
        case FORGOT_PASSWORD_FAILED:
            toast.error(payload?.error || "could not reset password this moment")
            return {
                ...state,
                errors: payload.error,
                data: null,
                isSubmitSuccessful: false,
                message: payload.message,
                loading: false,
            }
        case FORGOT_PASSWORD_SUCCESS:
            toast.success(payload?.success || "Password reset link sent to your email")
            return {
                ...state,
                loading: false,
                isSubmitSuccessful: true,
                message:payload.message
            }
        default:
            return state
    }
}
export default ForgotPasswordReducer;