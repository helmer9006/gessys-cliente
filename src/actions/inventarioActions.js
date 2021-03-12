import clienteAxios from "../config/axios.js";
import tokenAuth from "../config/tokenAuth";

//IMPORTANDO TYPES
import {
  COMENZAR_DESCARGA_INVENTARIO,
  DESCARGA_INVENTARIO_EXITO,
  DESCARGA_INVENTARIO_ERROR
} from "../types";

//#region OBTENIENDO LOS TICKETS DEL API
export function obtenerInventarioCategoriaAction(categoria) {
  return async (dispatch) => {
    dispatch(descargarInventarioCategoria());
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(`inventario/ticket/${categoria}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(descargaInventarioCategoriaExito(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaInventarioCategoriaError(error.response.data.msg));
    }
  };
}

//iniciando la descarga del inventario
const descargarInventarioCategoria = () => ({
  type: COMENZAR_DESCARGA_INVENTARIO,
  payload: true,
});

//almacenando los registros devueltos del api al state
const descargaInventarioCategoriaExito = (inventario) => ({
  type: DESCARGA_INVENTARIO_EXITO,
  payload: inventario,
});

//notificando error y enviando mensaje de error al state
const descargaInventarioCategoriaError = (error) => ({
  type: DESCARGA_INVENTARIO_ERROR,
  payload: error,
});
