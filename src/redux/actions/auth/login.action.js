import { LOGIN_SUCCESS, LOGIN_FAILED, LOADING } from "../../action.type";
import { retrieveErrMessage } from "../../../utils/retrieveError";
import request, { headers } from "../../../utils/apiHelper";
import { toast } from "react-toastify";

const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

const loginFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload,
});

const login = (payload) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const res = await request.post("signin", payload, headers);
    toast.success("Login Successful");
    return dispatch(loginSuccess(res.data));
  } catch (error) {
    toast.error(retrieveErrMessage(error.response.data.status));
    console.log(error.response.data.status);
    return dispatch(loginFailed(error));
  }
};

export default login;
