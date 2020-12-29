//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import { AUTENTICAR_USUARIO, AUTENTICAR_USUARIO_ERROR, AUTENTICAR_USUARIO_EXITO, CERRAR_SESION_USUARIO } from "../types";

const initialState = {
  accessToken: null,
  usuario: null,
  isLogin: false,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTENTICAR_USUARIO:
      return {
        ...state,
        loading: action.payload,
      };
      case AUTENTICAR_USUARIO_EXITO:
        return {
          ...state,
          loading: false,
          usuario: action.payload,
          error: null,
          isLogin: true
        };
        case AUTENTICAR_USUARIO_ERROR:
          return {
            ...state,
            usuario: null,
            error: action.payload,
            isLogin: false
          };
        case CERRAR_SESION_USUARIO:
          return {
            ...state,
            usuario: null,
            isLogin: false,
            accessToken: null
          }      
    default:
      return state;
  }
}
