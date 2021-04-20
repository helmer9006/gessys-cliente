import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";
import getJson from "../functions/getJson";

//IMPORTANDO TYPES
import {
  AUTENTICAR_USUARIO,
  AUTENTICAR_USUARIO_ERROR,
  AUTENTICAR_USUARIO_EXITO,
  CERRAR_SESION_USUARIO,
  USUARIO_AUTENTICADO,
} from "../types";
import Swal from "sweetalert2";

//ANT DESING
import { message } from "antd";

//CREAR TOKEN DE LOGIN
export function AutenticarUsuarioAction(paramUsuario) {
  return async (dispatch) => {
    dispatch(autenticarUsuario());
    try {
      // ENDPOINT LOGIN
      const res = await clienteAxios.post("/auth", paramUsuario);
      //ENDPOINT TRAER DATOS USUARIO LOGUEADO
      const result = await clienteAxios.get("/auth", {
        headers: {
          Authorization: "Bearer " + res.data.token, //el token se pasa en el header
        },
      });
      const { usuario } = result.data;
      const token = res.data.token;
      //Si todo sale bien, actualizar el state
      dispatch(autenticarUsuarioExito({ token: token, usuario: usuario }));
    } catch (error) {
      const validarData = getJson(
        error,
        ["response", "data", "msg"],
        "El servidor no esta disponible"
      );
      console.log(validarData);
      // Si hay error
      dispatch(autenticarUsuarioError(validarData));
      message.error({
        content: `${validarData}`,
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
    }
  };
}

//RETORNAR EL USUARIO AUTENTICADO EN BASE AL JWT DEL STORAGE
export function extraerUsuarioStorageAction() {
  return async (dispatch) => {
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/auth");
      dispatch(usuarioAutenticado(respuesta.data.usuario));
    } catch (error) {
      // Si hay error
      const validarData = getJson(
        error,
        ["response", "data", "msg"],
        "El servidor no esta disponible"
      );
      dispatch(autenticarUsuarioError(validarData));
      console.log(validarData);
      // dispatch(autenticarUsuarioError(error.response.data.msg));
      message.error({
        content: `${validarData}`,
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
    }
  };
}

//CERRAR SESION
export function CerrarSesionUsuarioAction() {
  return async (dispatch) => {
    try {
      //actualizar el state
      dispatch(CerrarSesionUsuario());
    } catch (error) {
      console.log(error);
      // Si hay error
      dispatch(autenticarUsuarioError(error));

      //alerta de error
    }
  };
}

// Iniciar autenticación
const autenticarUsuario = () => ({
  type: AUTENTICAR_USUARIO,
  payload: true,
});

// si el producto se guarda en la base de datos
const autenticarUsuarioExito = (datos) => ({
  type: AUTENTICAR_USUARIO_EXITO,
  payload: datos,
});

//si hay error
const autenticarUsuarioError = (error) => ({
  type: AUTENTICAR_USUARIO_ERROR,
  payload: error,
});

// cerar sesion usuario

const CerrarSesionUsuario = () => ({
  type: CERRAR_SESION_USUARIO,
});

//Traer datos usuario autenticado segundo token almacenado en local storage

const usuarioAutenticado = (usuario) => ({
  type: USUARIO_AUTENTICADO,
  payload: usuario,
});
