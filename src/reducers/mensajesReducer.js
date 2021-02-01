//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import {
  AGREGAR_MENSAJE,
  AGREGAR_MENSAJE_EXITO,
  AGREGAR_MENSAJE_ERROR,
  COMENZAR_DESCARGA_MENSAJES,
  DESCARGA_MENSAJES_EXITO,
  DESCARGA_MENSAJES_ERROR,
} from "../types";

const initialState = {
  mensajes: [],
  mensajeError: null,
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case COMENZAR_DESCARGA_MENSAJES:
    case AGREGAR_MENSAJE: 
      return {
        ...state,
        loading: action.payload
      }
      case AGREGAR_MENSAJE_EXITO:
        return {
            ...state,
            loading: false,
            mensajes: [...state.mensajes, action.payload]
        }
      case DESCARGA_MENSAJES_EXITO:
        return {
          ...state,
          loading: false,
          mensajes: action.payload,
          error: null,
          mensajeError: null
        }
        case AGREGAR_MENSAJE_ERROR:
        case DESCARGA_MENSAJES_ERROR:
          return {
            ...state,
            loading: false,
            mensajeError: action.payload,
            error: true
          }
    default:
      return state;
  }
}


