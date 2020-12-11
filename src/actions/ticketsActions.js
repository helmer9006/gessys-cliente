
import clienteAxios from "../config/axios.js";
//IMPORTANDO TYPES
import {
    TRAER_TICKET,
    TRAER_TICKET_EXITO,
    TRAER_TICKET_ERROR,
    AGREGAR_TICKET,
    AGREGAR_TICKET_EXITO, 
    AGREGAR_TICKET_ERROR
  } from "../types";


  //CREAR NUEVOS TICKETS
  export function crearNuevoTicketAction(ticket){
    return(dispatch)=>{
      dispatch(agregarTicket());
    }
  }

  const agregarTicket = (ticket) => ({
    type: AGREGAR_TICKET,
 
  })

  

