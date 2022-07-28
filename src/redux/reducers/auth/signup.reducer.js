import { SIGNUP_SUCCESS,SIGNUP_FAILED,SIGNUP } from "../../action.type";
import {toast} from "react-toastify"


const initialState = {
    data: "", errors: "", loading: false, message: ""
}

const SignupReducer = (state = initialState, action) => {
   
    const { payload, type } = action
    switch (type) {
        case SIGNUP:
            return {
                ...state,
                loading: true
            }

        case SIGNUP_FAILED:
            toast.error(payload?.error || "could not sign you up this moment")
            return {
                ...state,
                errors: payload.error,
                data: null,
                message: payload.message,
                loading: false,
            }
        case SIGNUP_SUCCESS:
            // window.location.href = `/login`;
            toast.success(payload?.success || "Signup Successful,Login to continue")
            return {
                ...state,
                data: payload.data.data,
                loading: false,
                message:payload.data.message
            }

        default:
            return state
    }
}

export default SignupReducer
