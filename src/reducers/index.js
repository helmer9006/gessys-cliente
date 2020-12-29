import { combineReducers } from "redux";
import ticketsReducer from './ticketsReducer';
import authReducer from './authReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    tickets: ticketsReducer,
    auth: authReducer,
    alerta: alertaReducer
});