import { combineReducers } from 'redux';
import userDetailReducer from './userDetailReducer';



export default combineReducers({
    user: userDetailReducer
});