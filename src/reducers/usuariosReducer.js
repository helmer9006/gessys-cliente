//CADA REDUCER TIENE SU PROPIO STATE
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

const initialState = {
  usuarios: [],
  usuarioEditar: null,
  mensajeError: null,
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_EDICION_USUARIO:
    case COMENZAR_DESCARGA_USUARIOS:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_USUARIO:
    case DESCARGA_USUARIOS_EXITO:
      return {
        ...state,
        loading: false,
        usuarios: action.payload,
        error: null,
        mensajeError: null,
      };
    case AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        usuarios: [...state.usuarios, action.payload],
      };
    case AGREGAR_USUARIO_ERROR:
    case USUARIO_EDITADO_ERROR:
    case DESCARGA_USUARIOS_ERROR:
      return {
        ...state,
        loading: false,
        mensajeError: action.payload,
        error: true,
      };
    case GUARDAR_USUARIO_EDITAR:
      localStorage.setItem("usuarioEditado", JSON.stringify(action.payload));
      return {
        ...state,
        usuarioEditar: action.payload,
      };
    case USUARIO_EDITADO_EXITO:
      return {
        ...state,
        loading: false,
        usuarioEditar: null,
        usuarios: state.usuarios.map((usuario) =>
          usuario._id === action.payload._id
            ? (usuario = action.payload)
            : usuario
        ),
      };
    default:
      return state;
  }
}
