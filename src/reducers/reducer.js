import { combineReducers } from "redux";
import authReducer from './auth.reducer.js';
import userReducer from './user.reducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;