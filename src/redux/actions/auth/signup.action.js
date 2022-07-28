import { SIGNUP_SUCCESS, SIGNUP_FAILED } from "../../action.type";
import { retrieveErrMessage } from "../../../utils/retrieveError";
import  request,{headers} from "../../../utils/apiHelper";
import {toast} from 'react-toastify';

const signupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload,
});

const signupFailed = (payload) => ({
  type: SIGNUP_FAILED,
  payload,
});

const signup = (payload) => async (dispatch) => {

  try {
    const res = await request.post("register", payload, headers);
      toast.success("Signup Successful and verifcation email sent");
    
      return dispatch(signupSuccess(res.message));
  } catch (error) {
    toast.error(retrieveErrMessage(error));
    return dispatch(signupFailed(error));
  }
};

export default signup;
