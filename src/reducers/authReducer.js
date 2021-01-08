//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import {
  AUTENTICAR_USUARIO,
  AUTENTICAR_USUARIO_ERROR,
  AUTENTICAR_USUARIO_EXITO,
  CERRAR_SESION_USUARIO,
  USUARIO_AUTENTICADO
} from "../types";

const initialState = {
  token: '',
  isLogin: false,
  usuario: null,
  loading: false,
  error: null,
};
console.log('token reducer ',localStorage.getItem("gessys_token"))
export default function (state = initialState, action) {
  switch (action.type) {
    case AUTENTICAR_USUARIO:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTENTICAR_USUARIO_EXITO:
      localStorage.setItem("gessys_token", action.payload.token);
      return {
        ...state,
        loading: false,
        error: null,
        isLogin: true,
        usuario: action.payload.usuario,
        token: localStorage.getItem("gessys_token")
      };
    case AUTENTICAR_USUARIO_ERROR:
      return {
        ...state,
        usuario: {},
        error: action.payload,
        isLogin: false,
      };
    case CERRAR_SESION_USUARIO:
      localStorage.removeItem('gessys_token');
      return {
        ...state,
        usuario: null,
        token: null,
        isLogin: false,
        
      };
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        isLogin: true,
        token: localStorage.getItem("gessys_token")
      };
    default:
      return state;
  }
}
