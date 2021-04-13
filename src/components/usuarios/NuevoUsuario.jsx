import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Col, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import fs from "fs";
import { fileToBase64 } from "../../utils";
import { objetoValidacionNuevo } from "./objetoValidacion";

//#region IMPORTANDO COMPONENTE DE MATERIAL-UI
import {
  FormControl,
  InputLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  Fab,
  Avatar,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Alert } from "antd";

//#endregion

//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerDependenciasAction } from "../../actions/dependenciasActions";
import { CrearUsuarioAction } from "../../actions/usuariosActions";

//#region ESTILOS MATERIAL
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  alerta: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

//#endregion

const NuevoUsuario = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    //consultar API
    const cargarDependencias = () => dispatch(obtenerDependenciasAction());
    cargarDependencias();
  }, []);

  // mandar llamar el action de ticketAction
  const crearUsuario = (usuario) => dispatch(CrearUsuarioAction(usuario));

  //#region  FOORMULARIO Y VALIDACION CON FORMIK YUP
  const [image_avatar, setIAvatar] = useState({
    file: null, // e.currentTarget
    b64: null,
  });

  const setAvatarFile = async (e) => {
    const file = e.currentTarget.files[0];

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/svg+xml" &&
      file.type !== "image/gif"
    ) {
      message.error({
        content: "Formato de imágen incorrecto..",
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
      return;
    }
    // await fileToBase64(file, setIAvatar);
    fileToBase64(file, setIAvatar);
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      password: "",
      email: "",
      dependencia: "",
      perfil: "",
      tipoIdentificacion: "",
      identificacion: "",
      foto: "",
    },
    validationSchema: Yup.object(objetoValidacionNuevo()),
    onSubmit: (usuario, e) => {
      usuario.foto = image_avatar.b64;
      if (usuario.foto === null) {
        message.error({
          content: "No ha finalizado de cargar la foto, espere un momento..",
          className: "custom-class",
          duration: 3,
          style: {
            // marginTop: '20vh',
          },
        });
        return;
      }
      crearUsuario(usuario);
      history.push("/usuarios");
    },
  });

  //#endregion

  //#region OBTENER ESTADOS DEL STORE
  const dependencias = useSelector((state) => state.dependencias.dependencias);

  //#endregion

  //#region DECLARANDO OPCIONES PARA EL SELECT DE DEPENDENCIAS
  const OpcionesDependencias = [];

  dependencias.forEach((element) => {
    OpcionesDependencias.push(
      <MenuItem key={element._id} value={element._id}>
        {element.nombre}
      </MenuItem>
    );
  });

  //#endregion

  return (
    <Card title="Crear Nuevo Usuario">
      <Row gutter={[8, 8]}>
        <Col span={8} push={0}>
          <FormControl className="anchoCompleto">
            <TextField
              id="nombre"
              name="nombre"
              label="Nombre"
              variant="outlined"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
          {formik.touched.nombre && formik.errors.nombre ? (
            <Alert
              className="anchoCompleto"
              message={formik.errors.nombre}
              type="error"
            />
          ) : null}
        </Col>
        <Col span={8} push={0}>
          <FormControl className="anchoCompleto">
            <TextField
              name="email"
              id="email"
              label="Correo"
              variant="outlined"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // Col={16}
            />
          </FormControl>
          {formik.touched.email && formik.errors.email ? (
            <Alert
              className="anchoCompleto"
              message={formik.errors.email}
              type="error"
            />
          ) : null}
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8} push={0}>
          <FormControl className="anchoCompleto">
            <TextField
              name="password"
              id="password"
              label="Contraseña"
              variant="outlined"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // Col={16}
            />
          </FormControl>
          {formik.touched.password && formik.errors.password ? (
            <Alert
              className="anchoCompleto"
              message={formik.errors.password}
              type="error"
            />
          ) : null}
        </Col>
        <Col span={8} push={0}>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="dependencia">Dependencia</InputLabel>
            <Select
              labelId="dependencia"
              name="dependencia"
              id="dependencia"
              label="Dependencia"
              value={formik.values.dependencia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="">
                <em>Seleccionar Dependencia</em>
              </MenuItem>
              {OpcionesDependencias}
            </Select>
          </FormControl>
          {formik.touched.dependencia && formik.errors.dependencia ? (
            <Alert
              className="anchoCompleto"
              message={formik.errors.dependencia}
              type="error"
            />
          ) : null}
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8} push={0}>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="tipoIdentificacion">Tipo Identificación</InputLabel>
            <Select
              labelId="tipoIdentificacion"
              name="tipoIdentificacion"
              id="tipoIdentificacion"
              value={formik.values.tipoIdentificacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Tipo Identificacion"
            >
              <MenuItem value="">
                <em>Seleccionar Tipo Identificación</em>
              </MenuItem>
              <MenuItem key="cc" value="cc">
                CC - Cédula de Ciudadanía
              </MenuItem>
              <MenuItem key="ce" value="ce">
                CE - Cédula de Extranjería
              </MenuItem>
              <MenuItem key="pe" value="pe">
                PE - Permiso Especial de permanencia
              </MenuItem>
            </Select>
          </FormControl>
          {formik.touched.tipoIdentificacion &&
          formik.errors.tipoIdentificacion ? (
            <Alert
              className="anchoCompleto"
              message={formik.errors.tipoIdentificacion}
              type="error"
            />
          ) : null}
        </Col>
        <Col span={8} push={0}>
          <FormControl className="anchoCompleto">
            <TextField
              name="identificacion"
              label="Numero Identificacion"
              variant="outlined"
              value={formik.values.identificacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
          {formik.touched.identificacion && formik.errors.identificacion ? (
            <Alert
              className="anchoCompleto"
              message={formik.errors.identificacion}
              type="error"
            />
          ) : null}
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8} push={0}>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="perfil">Perfil</InputLabel>
            <Select
              labelId="perfil"
              name="perfil"
              id="perfil"
              value={formik.values.perfil}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Perfil"
            >
              <MenuItem value="">
                <em>Seleccionar Perfil</em>
              </MenuItem>
              <MenuItem key="administrador" value="administrador">
                Administrador
              </MenuItem>
              <MenuItem key="especial" value="especial">
                Especial
              </MenuItem>
              <MenuItem key="estandar" value="estandar">
                Estandar
              </MenuItem>
            </Select>
          </FormControl>
          {formik.touched.perfil && formik.errors.perfil ? (
            <Alert
              className="anchoCompleto"
              message={formik.errors.perfil}
              type="error"
            />
          ) : null}
        </Col>
        <Col span={8} push={0}>
          <FormControl variant="outlined" className="anchoCompleto">
            <label htmlFor="foto">
              <input
                style={{ display: "none" }}
                id="foto"
                name="foto"
                type="file"
                onChange={setAvatarFile}
              />

              <Fab
                color="primary"
                size="large"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddIcon /> Subir Foto
              </Fab>
            </label>
          </FormControl>

          {formik.values.foto ? (
            <Avatar
              alt="Remy Sharp"
              src={formik.values.foto}
              className={classes.large}
            />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
            size="large"
            type="submit"
            onClick={() => history.push("/usuarios")}
          >
            VOLVER
          </Button>
          <Button
            variant="contained"
            id="guardarUsuario"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            size="large"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Guardar Usuario
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default NuevoUsuario;
