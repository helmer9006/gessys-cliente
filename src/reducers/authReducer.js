//CADA REDUCER TIENE SU PROPIO STATE
//IMPORTANDO TYPES
import { INICIAR_LOGIN, LOGIN_EXITOSO, LOGIN_ERROR } from "../types";

const initialState = {
  accessToken: null,
  usuario: null,
  isLogin: false,
  procesandoLogin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INICIAR_LOGIN:
      return {
        ...state,
        procesandoLogin: action.payload,
      };

    default:
      return state;
  }
}
