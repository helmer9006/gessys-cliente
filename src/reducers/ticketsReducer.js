//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import {
    AGREGAR_TICKET,
    AGREGAR_TICKET_EXITO,
    AGREGAR_TICKET_ERROR,
    COMENZAR_DESCARGA_TICKETS,
    DESCARGA_TICKETS_ERROR,
    DESCARGA_TICKETS_EXITO,
    OBTENER_TICKET_EDITAR,
    COMENZAR_EDICION_TICKET,
    TICKET_EDITADO_EXITO,
    TICKET_EDITADO_ERROR,
    ESTADISTICA_TICKETS,
    ESTADISTICA_TICKETS_ERROR,
    ESTADISTICA_TICKETS_EXITO,
} from "../types";

const initialState = {
    tickets: [],
    mensajeError: null,
    error: null,
    loading: false,
    ticketEditar: null,
    ticketEliminar: null,
    estadisticaTickets: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case AGREGAR_TICKET:
        case COMENZAR_DESCARGA_TICKETS:
        case COMENZAR_EDICION_TICKET:
        case ESTADISTICA_TICKETS:
            return {
                ...state,
                loading: action.payload,
            };
        case AGREGAR_TICKET_EXITO:
            return {
                ...state,
                loading: false,
                tickets: [...state.tickets, action.payload],
            };
        case DESCARGA_TICKETS_EXITO:
            localStorage.removeItem("ticketEditado");
            return {
                ...state,
                loading: false,
                tickets: action.payload,
                error: null,
                mensajeError: null,
            };
        case TICKET_EDITADO_ERROR:
        case AGREGAR_TICKET_ERROR:
        case DESCARGA_TICKETS_ERROR:
        case ESTADISTICA_TICKETS_ERROR:
            return {
                ...state,
                loading: false,
                mensajeError: action.payload,
                error: true,
            };
        case OBTENER_TICKET_EDITAR:
            localStorage.setItem("ticketEditado", JSON.stringify(action.payload));
            return {
                ...state,
                ticketEditar: action.payload,
            };
        case TICKET_EDITADO_EXITO:
            localStorage.removeItem("ticketEditado");
            return {
                ...state,
                loading: false,
                ticketEditar: null,
                tickets: state.tickets.map((ticket) =>
                    ticket._id === action.payload._id ? (ticket = action.payload) : ticket
                ),
            };
        case ESTADISTICA_TICKETS_EXITO:
            return {
                ...state,
                loading: false,
                estadisticaTickets: action.payload
            };
        default:
            return state;
    }
}