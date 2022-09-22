import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, LOADING } from "../../action.type";
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

const dismissToast = () => {
    toast.dismiss();
  };

const forgotPassword = (payload) => async (dispatch) => {
    dispatch({ type: LOADING });

    try {
        const res = await request.post("forgot-password", payload);
        
        toast.success(res.data.message, {
            autoClose: 3000,
            onClose: dismissToast,
          });
        return dispatch(forgotPasswordSuccess(res.data));
    } catch (error) {
        toast.error(error.message, {
            autoClose: 3000,
            onClose: dismissToast,
          });
        console.log(error);
        return dispatch(forgotPasswordFailed(error));
    }
}


export default forgotPassword;