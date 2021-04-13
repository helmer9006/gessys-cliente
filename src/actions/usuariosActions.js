import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";
import getJson from "../functions/getJson";
import { message } from "antd";
import axios from "axios";

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
      dispatch(descargaUsuariosExitosa(respuesta.data));
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

//convertir json a form data

const convertJsonToFormData = (data) => {
  const formData = new FormData();
  const entries = Object.entries(data); // devuelve una matriz de propiedad del objeto como [clave, valor]
  // https://medium.com/front-end-weekly/3-things-you-didnt-know-about-the-foreach-loop-in-js-ff02cec465b1

  for (let i = 0; i < entries.length; i++) {
    // no intente ser inteligente reemplazándolo con entradas, cada una tiene inconvenientes
    const arKey = entries[i][0];
    let arVal = entries[i][1];
    if (typeof arVal === "boolean") {
      arVal = arVal === true ? 1 : 0;
    }
    if (Array.isArray(arVal)) {
      console.log("displaying arKey");
      console.log(arKey);
      console.log("displaying arval");
      console.log(arVal);

      if (this.isFile(arVal[0])) {
        for (let z = 0; z < arVal.length; z++) {
          formData.append(`${arKey}[]`, arVal[z]);
        }

        continue; // no necesitamos agregar el elemento actual ahora, ya que sus elementos ya se agregaron
      } else if (arVal[0] instanceof Object) {
        for (let j = 0; j < arVal.length; j++) {
          if (arVal[j] instanceof Object) {
            // si el primer elemento no es un archivo, sabemos que no es una matriz de archivos
            for (const prop in arVal[j]) {
              if (Object.prototype.hasOwnProperty.call(arVal[j], prop)) {
                // hacer cosas
                if (!isNaN(Date.parse(arVal[j][prop]))) {
                  // console.log('Valid Date \n')
                  // (new Date(fromDate)).toUTCString()
                  formData.append(
                    `${arKey}[${j}][${prop}]`,
                    new Date(arVal[j][prop])
                  );
                } else {
                  formData.append(`${arKey}[${j}][${prop}]`, arVal[j][prop]);
                }
              }
            }
          }
        }
        continue; // we don't need to append current element now, as its elements already appended
      } else {
        arVal = JSON.stringify(arVal);
      }
    }

    if (arVal === null) {
      continue;
    }
    formData.append(arKey, arVal);
  }
  return formData;
};
