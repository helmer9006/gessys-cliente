import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";

//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_CATEGORIAS,
  DESCARGA_CATEGORIAS_ERROR,
  DESCARGA_CATEGORIAS_EXITO,
} from "../types";

//#region OBTENIENDO LOS TICKETS DEL API
export function obtenerCategoriasAction() {
  return async (dispatch) => {
    dispatch(descargarCategorias());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/categorias");
      dispatch(descargaCategoriasExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaCategoriasError(error.response.data.msg));
    }
  };
}

//iniciando la descarga de las categorias
const descargarCategorias = () => ({
  type: COMENZAR_DESCARGA_CATEGORIAS,
  payload: true,
});

//almacenando los categorias devueltos del api al state
const descargaCategoriasExitosa = (categorias) => ({
  type: DESCARGA_CATEGORIAS_EXITO,
  payload: categorias,
});

//notificando error y enviando mensaje de error al state
const descargaCategoriasError = (error) => ({
  type: DESCARGA_CATEGORIAS_ERROR,
  payload: error,
});
