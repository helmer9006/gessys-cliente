import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";
import getJson from "../functions/getJson";
import { message } from "antd";
import moment from "moment";

//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITO,
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_EXITO,
  AGREGAR_USUARIO_ERROR,
  GUARDAR_USUARIO_EDITAR,
  COMENZAR_EDICION_USUARIO,
  USUARIO_EDITADO_EXITO,
  USUARIO_EDITADO_ERROR,
} from "../types";

//#region OBTENIENDO LAS DEPENENCIAS DEL API
export function obtenerUsuariosAction() {
  return async (dispatch) => {
    dispatch(descargarUsuarios());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const usuarios = await filtrarTickets(respuesta.data);
      dispatch(descargaUsuariosExitosa(usuarios));
    } catch (error) {
      const validarData = getJson(
        error,
        ["response", "data", "msg"],
        "Error al obtener usuarios"
      );
      dispatch(descargaUsuariosError(validarData));
    }
  };
}

//iniciando la descarga de los usuarios
const descargarUsuarios = () => ({
  type: COMENZAR_DESCARGA_USUARIOS,
  payload: true,
});

//almacenando las usuarios devueltas del api al state
const descargaUsuariosExitosa = (usuarios) => ({
  type: DESCARGA_USUARIOS_EXITO,
  payload: usuarios,
});

//notificando error y enviando mensaje de error al state
const descargaUsuariosError = (error) => ({
  type: DESCARGA_USUARIOS_ERROR,
  payload: error,
});

//#endregion

//#region CREANDO USUARIOS EN EL API

export function CrearUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(crearUsuario());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      // console.log(usuario.foto)
      // return
      // insertar en el API
      await clienteAxios.post("/usuarios", usuario);
      dispatch(crearUsuarioExito(usuario));
      message.success({
        content: "Usuario Creado correctamente",
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
        "Error al guardar usuarios"
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
      dispatch(crearUsuarioError(validarData));
    }
  };
}

const crearUsuario = () => ({
  type: AGREGAR_USUARIO,
  payload: true,
});

const crearUsuarioExito = (usuario) => ({
  type: AGREGAR_USUARIO_EXITO,
  payload: usuario,
});

//notificando error y enviando mensaje de error al state
const crearUsuarioError = (error) => ({
  type: AGREGAR_USUARIO_ERROR,
  payload: error,
});

//#endregion

//#region COLOCANDO USUARIO A EDITAR EN EL STATE

// COLOCANDO EN EL STATE EL PRODUCTO A EDITAR
export function guardarUsuarioEditarAction(usuario) {
  return (dispatch) => {
    dispatch(guardarUsuarioEditar(usuario));
  };
}
const guardarUsuarioEditar = (usuario) => ({
  type: GUARDAR_USUARIO_EDITAR,
  payload: usuario,
});

//#endregion

//#region EDITANDO USUARIO

// Edita un registro en la api y state
export function editarUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(editarUsuario());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    if (usuario.password === "") {
      delete usuario.password;
    }
    try {
      await clienteAxios.put(`/usuarios`, usuario);
      dispatch(editarUsuarioExito(usuario));
      message.success({
        content: `Usuario actualizado correctamente.`,
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
        "Error al editar usuario"
      );
      console.log(validarData);
      console.log(error);
      message.error({
        content: `${validarData}`,
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
      dispatch(editarUsuarioError(validarData));
    }
  };
}
const editarUsuario = () => ({
  type: COMENZAR_EDICION_USUARIO,
  payload: true,
});

const editarUsuarioExito = (usuario) => ({
  type: USUARIO_EDITADO_EXITO,
  payload: usuario,
});

const editarUsuarioError = (error) => ({
  type: USUARIO_EDITADO_ERROR,
  payload: error,
});

//#endregion

//#region FORMATEAR USUARIOS CAMBIO DE FORMATO FECHA

const filtrarTickets = (usuarios) => {
  // console.log(usuarios);
  let datos = [];
  usuarios.map((item) => {
    let objeto = {};
    for (let indice in item) {
      if (indice === "creacion" || indice === "actualizacion") {
        objeto[indice] = moment(item[indice]).format("DD-MM-YYYY");
      } else {
        objeto[indice] = item[indice];
      }
    }
    datos.push(objeto);
  });
  return datos;
};

//#endregion
