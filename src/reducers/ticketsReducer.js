//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import {
  TRAER_TICKET,
  TRAER_TICKET_EXITO,
  TRAER_TICKET_ERROR,
  AGREGAR_TICKET,
  AGREGAR_TICKET_EXITO,
  AGREGAR_TICKET_ERROR,
} from "../types";

const initialState = {
  tickets: [],
  mensajeError: {},
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRAER_TICKET:
      return {
        ...state,
        loading: action.payload,
      };
    case TRAER_TICKET_EXITO:
      return {
        ...state,
        loading: false,
        error: false,
        mensajeError: {},
        documentos: action.payload,
      };
    case TRAER_TICKET_ERROR:
      return {
        ...state,
        loading: false,
        mensajeError: action.payload,
        error: true,
        documentos: state,
      };
    case AGREGAR_TICKET:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
