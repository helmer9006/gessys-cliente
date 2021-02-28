import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "../Avatar";
import { Row, Card, Col, message, Divider, Typography, Space } from "antd";

//#region IMPORTANDO COMPONENTE DE MATERIAL-UI
import {
  FormControl,
  InputLabel,
  Button,
  Input,
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
import { sizing } from "@material-ui/system";
import Mensajes from "../mensajes/Mensajes";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

//#endregion

//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { editarTicketAction } from "../../actions/ticketsActions";
import { obtenerDependenciasAction } from "../../actions/dependenciasActions";
import { obtenerCategoriasAction } from "../../actions/categoriasActions";
import { CrearMensajesAction } from "../../actions/mensajesActions";
import { obtenerMensajesAction } from "../../actions/mensajesActions";

const EditarTickets = () => {
  const { Text, Link } = Typography;

  //#region ESTILOS PERSONALIZADOS MATERIAL

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  //#endregion

  const history = useHistory();
  const dispatch = useDispatch();

  //#region OBTENER ESTADOS DEL STORE
  const dependencias = useSelector((state) => state.dependencias.dependencias);
  const categorias = useSelector((state) => state.categorias.categorias);
  const usuarioAuth = useSelector((state) => state.auth.usuario);
  const [ticket, setTicket] = useState({
    _id: "",
    codigo: "",
    titulo: "",
    tipo: "",
    dependencia: "",
    categoria: "",
    prioridad: "",
    estado: "",
    usuario: "",
    creacion: "",
    actualizacion: "",
    descripcion: "prueba fecha",
    mensaje: "",
    nombreCategoria: "",
    nombreDependencia: "",
    nombreUsuario: "",
  });
  // producto a editar
  let ticketEditar = useSelector((state) => state.tickets.ticketEditar);

  //DESTRUCTURING
  let {
    _id,
    titulo,
    descripcion: descripcionEditar,
    tipo,
    dependencia,
    nombreDependencia,
    categoria,
    nombreCategoria,
    prioridad,
    estado,
    usuario,
    nombreUsuario,
    creacion,
  } = ticket;
  //STATE LOCAL
  const [mensaje, setMensaje] = useState({
    descripcion: "",
    ticket: ticket._id,
  });

  // if(!ticket) return;
  useEffect(() => {
    setTicket(ticketEditar);
    const cargarDependencias = () => dispatch(obtenerDependenciasAction());
    const cargarCategorias = () => dispatch(obtenerCategoriasAction());
    cargarDependencias();
    cargarCategorias();
    // estadoControles(usuarioAuth.perfil);
  }, [ticketEditar]);

  useEffect(() => {
    setTicket(JSON.parse(localStorage.getItem("ticketEditado")));
  }, []);

  const { descripcion } = mensaje;

  const [estadoElementos, setEstadoElementos] = useState(false);
  const [estadoElementoEstado, setEstadoElementoEstado] = useState(false);

  //capturar datos del formulario
  const handleChangeTicket = (event) => {
    if (event.target.name === "dependencia") {
      setTicket({
        ...ticket,
        [event.target.name]: event.target.value,
        categoria: "",
      });
    } else {
      setTicket({
        ...ticket,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleChangeMensaje = (event) => {
    setMensaje({
      ...mensaje,
      [event.target.name]: event.target.value,
    });
  };

  //mandar a llamar el action de tickets

  const onSubmitEditar = (event) => {
    event.preventDefault();
    if (
      titulo.trim() === "" ||
      dependencia.trim() === "" ||
      categoria.trim() === "" ||
      tipo.trim() === "" ||
      prioridad.trim() === ""
    ) {
      message.error({
        content: "Todos los campos son obligatorios",
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
      return;
    }
    //SINO HAY ERRORES

    dispatch(editarTicketAction(ticket));
    history.push("/tickets");
  };

  // //colocar en blanco categoria al cambiar la dependencia
  // useEffect(() => {
  //   if(ticket) return
  //   setTicket({
  //     ...ticket,
  //     categoria: "",
  //   });
  // }, [dependencia]);
  const onSubmitMensaje = (event) => {
    event.preventDefault();
    if (descripcion.trim() === "") {
      message.error({
        content: "Todos los campos son obligatorios",
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
      return;
    }
    dispatch(CrearMensajesAction(mensaje));
    const cargarMensajes = (_id) => dispatch(obtenerMensajesAction(_id));
    setMensaje({
      ...mensaje,
      descripcion: "",
    });
    cargarMensajes(ticket._id);
  };

  //#region DECLARANDO OPCIONES PARA EL SELECT DE DEPENDENCIAS
  const OpcionesDependencias = [];

  //FILTRAR DEPENDENCIAS POR ESTADO SOPORTE TRUE
  const dependenciasDeSoporte = dependencias.filter(
    (item) => item.soporte === true
  );

  dependenciasDeSoporte.forEach((element) => {
    OpcionesDependencias.push(
      <MenuItem key={element._id} value={element._id}>
        {element.nombre}
      </MenuItem>
    );
  });

  //#endregion

  //#region  CREANDO OPCIONES CATEGORIAS

  //ARRAY PARA ALMACENAR LAS OPCIONES
  const OpcionesCategorias = [];

  //FILTRAR CATEGORIAS POR DEPENDENCIA SELECCIONADA

  const categoriasDeSoporte = categorias.filter(
    (item) => item.dependencia === dependencia
  );

  categoriasDeSoporte.forEach((element) => {
    OpcionesCategorias.push(
      <MenuItem key={element._id} value={element._id}>
        {element.nombre}
      </MenuItem>
    );
  });

  //#endregion

  //#region DISPONER EDICION DE CONTROLES(CAMPOS)

  const estadoControles = (perfil) => {
    //VALIDAR TIPO DE USUARIO PARA ESTADO DE ELEMENTOS
    if (perfil === "estandar") {
      setEstadoElementos(true);
      setEstadoElementoEstado(true);
    } else if (perfil === "especial") {
      setEstadoElementos(true);
      setEstadoElementoEstado(false);
    }
  };

  //#endregion

  return (
    <Card title="Editando Ticket">
      <Row gutter={[8, 8]}>
        <Col span={18} push={6}>
          <FormControl className="anchoCompleto">
            <TextField
              name="titulo"
              label="Titulo"
              variant="outlined"
              value={titulo}
              onChange={handleChangeTicket}
            />
          </FormControl>
          <FormControl className="anchoCompleto">
            <TextField
              name="descripcion"
              id="descripcion"
              label="Mensaje"
              multiline
              rows={16}
              variant="outlined"
              onChange={handleChangeMensaje}
              value={mensaje.descripcion}
              // Col={16}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SendIcon />}
            size="large"
            type="submit"
            onClick={onSubmitMensaje}
            align="right"
          ></Button>
          {ticket ? <Mensajes /> : null}

          <Card
            style={{
              borderRadius: "7px 7px 7px 7px",
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
              backgroundColor: "#fff",
              margin: "30px 0px 10px 0px",
            }}
          >
            <Row justify="start" gutter={8} align="middle">
              <Col>
                <Avatar name={nombreUsuario} size="small" />
              </Col>
              <Col>
                <Text strong>{nombreUsuario} </Text>
              </Col>
              <Col>
                <Text>{creacion} </Text>
              </Col>
            </Row>
            <br />
            <Text>{descripcionEditar}</Text>
          </Card>
        </Col>
        <Col span={6} pull={18}>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="dependencia">Dependencia</InputLabel>
            <Select
              labelId="dependencia"
              name="dependencia"
              id="dependencia"
              value={dependencia}
              onChange={handleChangeTicket}
              label="Dependencia"
              disabled={estadoElementos}
            >
              <MenuItem value="">
                <em>Seleccionar Dependencia</em>
              </MenuItem>
              {OpcionesDependencias}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="categoria">Categoria</InputLabel>
            <Select
              labelId="categoria"
              name="categoria"
              id="categoria"
              value={categoria}
              onChange={handleChangeTicket}
              label="Categoria"
              disabled={estadoElementos}
            >
              <MenuItem value="">
                <em>Seleccionar Categoria</em>
              </MenuItem>
              {OpcionesCategorias}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="tipo">Tipo</InputLabel>
            <Select
              labelId="tipo"
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={handleChangeTicket}
              label="Tipo"
              disabled={estadoElementos}
            >
              <MenuItem value="">
                <em>Seleccionar Tipo</em>
              </MenuItem>
              <MenuItem key="soporte" value="soporte">
                SOPORTE
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="prioridad">Prioridad</InputLabel>
            <Select
              labelId="prioridad"
              name="prioridad"
              id="prioridad"
              value={prioridad}
              onChange={handleChangeTicket}
              label="Prioridad"
              disabled={estadoElementos}
            >
              <MenuItem value="">
                <em>Seleccionar Prioridad</em>
              </MenuItem>
              <MenuItem key="baja" value="baja">
                BAJA
              </MenuItem>
              <MenuItem key="media" value="media">
                MEDIA
              </MenuItem>
              <MenuItem key="alta" value="alta">
                ALTA
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="estado">Estado</InputLabel>
            <Select
              labelId="estado"
              name="estado"
              id="estado"
              value={estado}
              onChange={handleChangeTicket}
              label="Estado"
              disabled={estadoElementoEstado}
            >
              <MenuItem value="">
                <em>Seleccionar Estado</em>
              </MenuItem>
              <MenuItem key="nuevo" value="nuevo">
                NUEVO
              </MenuItem>
              <MenuItem key="proceso" value="proceso">
                PROCESO
              </MenuItem>
              <MenuItem key="resuelto" value="resuelto">
                RESUELTO
              </MenuItem>
              <MenuItem key="cancelado" value="cancelado">
                CANCELADO
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
            size="large"
            type="submit"
            onClick={() => history.push("/tickets")}
          >
            VOLVER
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            size="large"
            type="submit"
            onClick={onSubmitEditar}
          >
            Guardar Cambios
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default EditarTickets;
