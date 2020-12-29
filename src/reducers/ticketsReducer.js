//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_TICKETS,
  DESCARGA_TICKETS_ERROR,
  DESCARGA_TICKETS_EXITO,

} from "../types";

const initialState = {
  tickets: [],
  mensajeError: null,
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case COMENZAR_DESCARGA_TICKETS:
      return {
        ...state,
        loading: action.payload
      }
      case DESCARGA_TICKETS_EXITO:
        return {
          ...state,
          loading: false,
          tickets: action.payload,
          error: null,
          mensajeError: null
        }  

        case DESCARGA_TICKETS_ERROR:
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


