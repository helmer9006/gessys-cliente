import * as Yup from "yup";
export const objetoValidacionNuevo = () => {
  return {
    nombre: Yup.string().required("El nombre es obligatorio."),
    email: Yup.string()
      .email("El el correo no es válido.")
      .required("El correo es obligatorio."),
    password: Yup.string()
      .required("La contraseña es obligatoria.")
      .min(6, "La contraseña debe contener al menos 6 caracteres."),
    dependencia: Yup.string().required("La dependencia es obligatoria."),
    perfil: Yup.string().required("El perfil es obligatorio."),
    tipoIdentificacion: Yup.string().required(
      "El tipo de identificación es obligatorio."
    ),
    identificacion: Yup.string().required("La identificación es obligatoria."),
  };
};

export const objetoValidacionEditar = () => {
  return {
    nombre: Yup.string().required("El nombre es obligatorio."),
    email: Yup.string()
      .email("El el correo no es válido.")
      .required("El correo es obligatorio."),
    dependencia: Yup.string().required("La dependencia es obligatoria."),
    perfil: Yup.string().required("El perfil es obligatorio."),
    tipoIdentificacion: Yup.string().required(
      "El tipo de identificación es obligatorio."
    ),
    identificacion: Yup.string().required("La identificación es obligatoria."),
  };
};
