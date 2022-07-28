import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signup.reducer';

const rootReducer = combineReducers({
  signup: signupReducer,
});

export default rootReducer;