import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";

//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_DEPENDENCIAS,
  DESCARGA_DEPENDENCIAS_ERROR,
  DESCARGA_DEPENDENCIAS_EXITO,
} from "../types";

//#region OBTENIENDO LOS TICKETS DEL API
export function obtenerDependenciasAction() {
  return async (dispatch) => {
    dispatch(descargarDependencias());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/dependencias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(descargaDependenciasExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaDependenciasError(error.response.data.msg));
    }
  };
}

//iniciando la descarga de los tickets
const descargarDependencias = () => ({
  type: COMENZAR_DESCARGA_DEPENDENCIAS,
  payload: true,
});

//almacenando los tickets devueltos del api al state
const descargaDependenciasExitosa = (dependencias) => ({
  type: DESCARGA_DEPENDENCIAS_EXITO,
  payload: dependencias,
});

//notificando error y enviando mensaje de error al state
const descargaDependenciasError = (error) => ({
  type: DESCARGA_DEPENDENCIAS_ERROR,
  payload: error,
});
