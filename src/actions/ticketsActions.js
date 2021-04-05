import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";
import getJson from "../functions/getJson";
import moment from "moment";
import "moment/locale/es";
//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_TICKETS,
  DESCARGA_TICKETS_ERROR,
  DESCARGA_TICKETS_EXITO,
  AGREGAR_TICKET,
  AGREGAR_TICKET_EXITO,
  AGREGAR_TICKET_ERROR,
  AUTENTICAR_USUARIO_ERROR,
  OBTENER_TICKET_EDITAR,
  COMENZAR_EDICION_TICKET,
  TICKET_EDITADO_EXITO,
  TICKET_EDITADO_ERROR,
} from "../types";
import { message } from "antd";

//#region OBTENIENDO LOS TICKETS DEL API
export function obtenerTicketsAction() {
  return async (dispatch) => {
    dispatch(descargarTickets());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/tickets");
      const tickets = await filtrarTickets(respuesta.data);
      dispatch(descargaTicketsExitosa(tickets));
    } catch (error) {
      const validarData = getJson(
        error,
        ["response", "data", "msg"],
        "Error al obtener tickets"
      );
      message.error({
        content: `${validarData}`,
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
      dispatch(descargaTicketsError(validarData));
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
  payload: tickets,
});

//notificando error y enviando mensaje de error al state
const descargaTicketsError = (error) => ({
  type: DESCARGA_TICKETS_ERROR,
  payload: error,
});

////si hay error
const autenticarUsuarioError = (error) => ({
  type: AUTENTICAR_USUARIO_ERROR,
  payload: error,
});

//#endregion

//#region CREANDO TICKETS EN EL API
export function CrearTicketsAction(ticket) {
  console.log(ticket);
  if (ticket.inventario === "") {
    delete ticket.inventario;
  }

  return async (dispatch) => {
    dispatch(crearTicket());
    try {
      // insertar en la API
      await clienteAxios.post("/tickets", ticket);
      dispatch(crearTicketExito(ticket));
      message.success({
        content: "Ticket Creado correctamente",
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
    } catch (error) {
      console.log(error.response.data.errors);
      message.error({
        content: `${error.response.data.msg}`,
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
      dispatch(crearTicketsError(error.response.data.msg));
    }
  };
}

const crearTicket = () => ({
  type: AGREGAR_TICKET,
  payload: true,
});

const crearTicketExito = (ticket) => ({
  type: AGREGAR_TICKET_EXITO,
  payload: ticket,
});

//notificando error y enviando mensaje de error al state
const crearTicketsError = (error) => ({
  type: AGREGAR_TICKET_ERROR,
  payload: error,
});

//#endregion

//#region COLOCANDO EN EL STATE EL PRODUCTO A EDITAR
export function obtenerTicketEditarAction(ticket) {
  return (dispatch) => {
    dispatch(obtenerTicketEditar(ticket));
  };
}

const obtenerTicketEditar = (ticket) => ({
  type: OBTENER_TICKET_EDITAR,
  payload: ticket,
});
//#endregion

//#region EDITAR UN REGISTRO DE TICKET EN EL API Y STATE

// Edita un registro en la api y state
export function editarTicketAction(ticket) {
  return async (dispatch) => {
    dispatch(editarTicket());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    if (ticket.creacion) {
      delete ticket.creacion;
    }
    try {
      await clienteAxios.put(`/tickets`, ticket);
      dispatch(editarTicketExito(ticket));
      message.success({
        content: `Ticket actualizado correctamente.`,
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
    } catch (error) {
      const validarData = getJson(
        error,
        ["response", "data", "msg"],
        "Error al editar ticket"
      );
      console.log(validarData);
      message.error({
        content: `${validarData}`,
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });

      dispatch(editarTicketError(validarData));
    }
  };
}
const editarTicket = () => ({
  type: COMENZAR_EDICION_TICKET,
  payload: true,
});

const editarTicketExito = (ticket) => ({
  type: TICKET_EDITADO_EXITO,
  payload: ticket,
});

const editarTicketError = (error) => ({
  type: TICKET_EDITADO_ERROR,
  payload: error,
});

//#endregion

//#region FILTRANDO TICKETS
const filtrarTickets = (tickets) => {
  // console.log(tickets);
  let datos = [];
  tickets.map((item) => {
    let objeto = {};
    for (let indice in item) {
      if (indice === "categoria") {
        objeto[indice] = item[indice]._id;
        objeto["nombreCategoria"] = item[indice].nombre;
      } else if (indice === "dependencia") {
        objeto[indice] = item[indice]._id;
        objeto["nombreDependencia"] = item[indice].nombre;
      } else if (indice === "usuario") {
        objeto[indice] = item[indice]._id;
        objeto["nombreUsuario"] = item[indice].nombre;
      } else if (indice === "creacion" || indice === "actualizacion") {
        objeto[indice] = moment(item[indice]).format("DD-MM-YYYY hh:mm a");
      } else {
        objeto[indice] = item[indice];
      }
    }
    datos.push(objeto);
  });
  return datos;
};

//#endregion
