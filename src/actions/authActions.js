import clienteAxios from "../config/axios.js";
//IMPORTANDO TYPES
import {
  AUTENTICAR_USUARIO,
  AUTENTICAR_USUARIO_ERROR,
  AUTENTICAR_USUARIO_EXITO,
  CERRAR_SESION_USUARIO
} from "../types";
import Swal from "sweetalert2";

//CREAR TOKEN DE LOGIN
export function AutenticarUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(autenticarUsuario());
    try {
      const res = await clienteAxios.post("auth", usuario);

      // Si todo sale bien, actualizar el state
      dispatch(autenticarUsuarioExito(usuario));
    } catch (error) {
      console.log(error);
      // Si hay error
      dispatch(autenticarUsuarioError(error));
    }
  };
}

//CERRAR SESION
export function CerrarSesionUsuarioAction() {
    return  async(dispatch) => {
      try {
        //actualizar el state
        dispatch(CerrarSesionUsuario());
      } catch (error) {
        console.log(error);
        // Si hay error
        dispatch(autenticarUsuarioError(error));
      }
    };
  }


// Iniciar autenticación
const autenticarUsuario = () => ({
  type: AUTENTICAR_USUARIO,
  payload: true,
});

// si el producto se guarda en la base de datos
const autenticarUsuarioExito = (usuario) => ({
  type: AUTENTICAR_USUARIO_EXITO,
  payload: usuario,
});

//si hay error

const autenticarUsuarioError = (error) => ({
    type: AUTENTICAR_USUARIO_ERROR,
    payload: error
})

// cerar sesion usuario 

const CerrarSesionUsuario = () => ({
    type: CERRAR_SESION_USUARIO
})