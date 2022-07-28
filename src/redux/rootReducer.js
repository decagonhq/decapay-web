import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signup.reducer';
import loginReducer from './reducers/auth/login.reducer';
import forgotPasswordReducer from './reducers/auth/forgotPassword.reducer';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
});

export default rootReducer;