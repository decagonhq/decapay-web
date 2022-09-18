import { LOGIN_SUCCESS, LOGIN_FAILED, LOADING } from "../../action.type";
import { retrieveErrMessage } from "../../../utils/retrieveError";
import request  from "../../../utils/apiHelper";
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
    const res = await request.post("signin", payload);
    toast.success("Login Successful");
    return dispatch(loginSuccess(res.data));
  } catch (error) {
    toast.error(retrieveErrMessage(error.response.data.message));
    console.log(error.response.data.message);
    return dispatch(loginFailed(error));
  }
};

export default login;
