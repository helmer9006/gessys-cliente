//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_INVENTARIO,
  DESCARGA_INVENTARIO_EXITO,
  DESCARGA_INVENTARIO_ERROR
  
  } from "../types";
  
  const initialState = {
    inventarioPorCategoria: [],
    inventario: [],
    mensajeError: null,
    error: null,
    loading: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
  
      case COMENZAR_DESCARGA_INVENTARIO:
        return {
          ...state,
          loading: action.payload
        }
        case DESCARGA_INVENTARIO_EXITO:
          return {
            ...state,
            loading: false,
            inventarioPorCategoria: action.payload,
            error: null,
            mensajeError: null
          }  
  
          case DESCARGA_INVENTARIO_ERROR:
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
  
  
  