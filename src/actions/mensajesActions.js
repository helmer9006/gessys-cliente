import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";
import getJson from "../functions/getJson";
//IMPORTANDO TYPES
import {
  AGREGAR_MENSAJE,
  AGREGAR_MENSAJE_EXITO,
  AGREGAR_MENSAJE_ERROR,
  COMENZAR_DESCARGA_MENSAJES,
  DESCARGA_MENSAJES_EXITO,
  DESCARGA_MENSAJES_ERROR,
} from "../types";
import { message } from "antd";

//#region OBTENIENDO LOS MENSAJES DEL API
export function obtenerMensajesAction(idTicket) {
  return async (dispatch) => {
    dispatch(descargarMensajes());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(`/mensajes/${idTicket}`);
      dispatch(descargaMensajesExitosa(respuesta.data));
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
      dispatch(descargaMensajesError(validarData));

    }
  };
}

//iniciando la descarga de los mensajes
const descargarMensajes = () => ({
  type: COMENZAR_DESCARGA_MENSAJES,
  payload: true,
});

//almacenando los tickets devueltos del api al state
const descargaMensajesExitosa = (tickets) => ({
  type: DESCARGA_MENSAJES_EXITO,
  payload: tickets,
});

//notificando error y enviando mensaje de error al state
const descargaMensajesError = (error) => ({
  type: DESCARGA_MENSAJES_ERROR,
  payload: error,
});

//#endregion

//#region CREANDO MENSAJE EN EL API
export function CrearMensajesAction(mensaje) {
  console.log(mensaje);
  return async (dispatch) => {
    dispatch(crearMensaje());
    try {
      // insertar en la API
      await clienteAxios.post("/mensajes", mensaje);
      dispatch(crearMensajeExito(mensaje));
      message.success({
        content: `Mensaje creado correctamente.`,
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
      dispatch(crearMensajeError(validarData));
    }
  };
}

const crearMensaje = () => ({
  type: AGREGAR_MENSAJE,
  payload: true,
});

const crearMensajeExito = (mensaje) => ({
  type: AGREGAR_MENSAJE_EXITO,
  payload: mensaje,
});

//notificando error y enviando mensaje de error al state
const crearMensajeError = (error) => ({
  type: AGREGAR_MENSAJE_ERROR,
  payload: error,
});

//#endregion