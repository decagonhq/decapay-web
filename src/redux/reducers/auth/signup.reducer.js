import { SIGNUP_SUCCESS,SIGNUP_FAILED,SIGNUP } from "../../action.type";
import {toast} from "react-toastify"


const initialState = {
    data: "", errors: "", loading: false, message: ""
}
const timerBeforeRedirect= () => {
    setTimeout(() => {
        window.location.href = `/`;
    }, 4000);
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
            
            toast.success(payload?.success || "Signup Successful,Login to continue")
            timerBeforeRedirect()
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
