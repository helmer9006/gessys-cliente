import React, { useState, useEffect } from "react";
import { Card, Input, message } from "antd";
import { useFormik } from "formik";
import TablaUsuarios from "./TablaUsuarios";
import { Link } from "react-router-dom";
//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTION DE REDUX
import { obtenerUsuariosAction } from "../../actions/usuariosActions";
import { obtenerDependenciasAction } from "../../actions/dependenciasActions";
import { obtenerCategoriasAction } from "../../actions/categoriasActions";

//#region MATERIAL UI
import {
  FormControl,
  InputLabel,
  Button,
  TextareaAutosize,
  TextField,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { FullscreenExitOutlined, AudioOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    width: "100%",
    backgroundColor: "#d5d5d5",
    color: "#333",
  },
  tab: {
    minWidth: "50%",
    width: "50%",
  },
  cargando: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
//#endregion

const Usuarios = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //EJECUTANDO FUNCIONES DEL ACTION
  const obtenerUsuarios = () => dispatch(obtenerUsuariosAction());
  const obtenerDependencias = () => dispatch(obtenerDependenciasAction());
  const obtenerCategorias = () => dispatch(obtenerCategoriasAction());
  // STATE LOCAL
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    password: "",
    email: "",
    dependencia: "",
    estado: "",
    _id: "",
    perfil: "",
    creacion: "",
    tipoIdentificacion: "",
    identificacion: "",
    foto: "",
  });

  //DESCENSTRUCTURAR

  const {
    nombre,
    password,
    email,
    dependencia,
    estado,
    _id,
    perfil,
    creacion,
    tipoIdentificacion,
    identificacion,
    foto,
  } = usuario;

  useEffect(() => {
    obtenerUsuarios();
    obtenerDependencias();
    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
  };
  return (
    <div className="site-card-border-less-wrapper">
      <TablaUsuarios />
      <Link to={`usuarios/nuevo`}>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: 15, right: 15 }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Usuarios;
