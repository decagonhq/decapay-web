import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signup.reducer';
import loginReducer from './reducers/auth/login.reducer';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
});

export default rootReducer;