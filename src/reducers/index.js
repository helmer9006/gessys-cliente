import { combineReducers } from "redux";
import ticketsReducer from "./ticketsReducer";
import authReducer from "./authReducer";
import alertaReducer from "./alertaReducer";
import dependenciasReducer from "./dependenciasReducer";
import categoriasReducer from "./categoriasReducer";
import mensajesReducer from "./mensajesReducer";
import inventarioReducer from "./inventarioReducer";

export default combineReducers({
  tickets: ticketsReducer,
  auth: authReducer,
  alerta: alertaReducer,
  dependencias: dependenciasReducer,
  categorias: categoriasReducer,
  mensajes: mensajesReducer,
  inventario: inventarioReducer,
});
