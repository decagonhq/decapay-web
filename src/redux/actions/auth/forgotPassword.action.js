import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, LOADING } from "../../action.type";
import { retrieveErrMessage } from "../../../utils/retrieveError";
import request from "../../../utils/apiHelper";
import { toast } from "react-toastify";


const forgotPasswordSuccess = (payload) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
    }
);


const forgotPasswordFailed = (payload) => ({
    type: FORGOT_PASSWORD_FAILED,
    payload,
    }
);



const forgotPassword = (payload) => async (dispatch) => {
    dispatch({ type: LOADING });

    try {
        const res = await request.post("forgot-password", payload,{ headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "Authorization": `Bearer ${localStorage.getItem("token")}`,
            'DVC_KY_HDR': '2',
        }});
        
        toast.success("Password reset link sent to your email");
        return dispatch(forgotPasswordSuccess(res.data));
    } catch (error) {
        toast.error(retrieveErrMessage(error));
        console.log(error);
        return dispatch(forgotPasswordFailed(error));
    }
}


export default forgotPassword;