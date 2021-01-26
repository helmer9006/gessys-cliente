//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import {
    COMENZAR_DESCARGA_CATEGORIAS,
    DESCARGA_CATEGORIAS_ERROR,
    DESCARGA_CATEGORIAS_EXITO
  
  } from "../types";
  
  const initialState = {
    categorias: [],
    mensajeError: null,
    error: null,
    loading: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
  
      case COMENZAR_DESCARGA_CATEGORIAS:
        return {
          ...state,
          loading: action.payload
        }
        case DESCARGA_CATEGORIAS_EXITO:
          return {
            ...state,
            loading: false,
            categorias: action.payload,
            error: null,
            mensajeError: null
          }  
  
          case DESCARGA_CATEGORIAS_ERROR:
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
  
  
  