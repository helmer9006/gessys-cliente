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
export function obtenerTicketsAction() {
  return async (dispatch) => {
    dispatch(descargarTickets());
    try {
      const respuesta = await clienteAxios.get("/tickets", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmFkYWFlMmQ5MjlkMjE1Yzg5YjJiOSIsIm5vbWJyZSI6IkhlbG1lciBWaWxsYXJyZWFsIiwiZW1haWwiOiJoZWxtZXJ2aWxsYXJyZWFsQGhvdG1haWwuY29tIiwicGVyZmlsIjoiYWRtaW5pc3RyYWRvciIsImRlcGVuZGVuY2lhIjoiNWZiYWRhNTkyZDkyOWQyMTVjODliMmI4IiwiZXN0YWRvIjp0cnVlLCJpYXQiOjE2MDc5NDg4MTAsImV4cCI6MTYwNzk3NzYxMH0.iyC8ZnpfJk1SCAZl8bsWehUY8SGGW70F4ONAvDEHmpU`,
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