import { combineReducers } from "redux";
import customerReducer from './customerReducer';
import itemReducer from './itemReducer';

export default combineReducers({
    customers: customerReducer,
    items: itemReducer
});