import clienteAxios from "../config/axios.js";
//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_TICKETS,
  DESCARGA_TICKETS_ERROR,
  DESCARGA_TICKETS_EXITO,
} from "../types";

//CREAR NUEVOS TICKETS
// export function crearNuevoTicketAction(ticket){
//   return(dispatch)=>{
//     dispatch(agregarTicket());
//   }
// }

// const agregarTicket = (ticket) => ({
//   type: AGREGAR_TICKET,

// })

//#region OBTENIENDO LOS TICKETS DEL API
export function obtenerTicketsAction(token) {
  console.log('token desde action ticket ', token)
  return async (dispatch) => {
    dispatch(descargarTickets());
    try {
      const respuesta = await clienteAxios.get("/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(descargaTicketsExitosa(respuesta.data))
    } catch (error) {
      console.log(error);
      dispatch(descargaTicketsError(error.response.data.msg))
    }
  };
}

//iniciando la descarga de los tickets
const descargarTickets = () => ({
  type: COMENZAR_DESCARGA_TICKETS,
  payload: true,
});

//almacenando los tickets devueltos del api al state
const descargaTicketsExitosa = (tickets) => ({
  type: DESCARGA_TICKETS_EXITO,
  payload: tickets
})

//notificando error y enviando mensaje de error al state
const descargaTicketsError = (error) => ({
  type: DESCARGA_TICKETS_ERROR,
  payload: error

})

//#endregion