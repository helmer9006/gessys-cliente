import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Row, Card, Col, message } from "antd";

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
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { sizing } from "@material-ui/system";

//#endregion



//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { editarTicketAction } from '../../actions/ticketsActions';
import { obtenerDependenciasAction } from "../../actions/dependenciasActions";
import { obtenerCategoriasAction } from "../../actions/categoriasActions";



const EditarTickets = () => {

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
    const usuario = useSelector((state) => state.auth.usuario)

    //STATE LOCAL
    const [ticket, setTicket] = useState({
        //codigo - hacer consulta al api, traer el ultio y aumentar codigo
        titulo: "",
        descripcion: "",
        tipo: "",
        dependencia: "",
        categoria: "",
        prioridad: "",
      });

      const [estadoElemento, setEstadoElemento] = useState('false')

          // producto a editar
    const ticketEditar = useSelector(state => state.tickets.ticketEditar);
      // llenar el state automaticamente
      useEffect( () => {
        setTicket(ticketEditar);
        const cargarDependencias = () => dispatch(obtenerDependenciasAction());
        const cargarCategorias = () => dispatch(obtenerCategoriasAction());
        cargarDependencias();
        cargarCategorias();
    }, [ticketEditar]);

    //capturar datos del formulario
    const handleChange = (event) => {
        setTicket({
          ...ticket,
          [event.target.name]: event.target.value,
        });
      };

  //DESTRUCTURING
  const {
    titulo,
    descripcion,
    tipo,
    dependencia,
    categoria,
    prioridad,
  } = ticket;


  //mandar a llamar el action de tickets

  const onSubmitEditar = (event) => {
    event.preventDefault();
    if (
      titulo.trim() === "" ||
      descripcion.trim() === "" ||
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
    history.push('/tickets');
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

//VALIDAR TIPO DE USUARIO PARA ESTADO DE ELEMENTOS
 console.log('perfil'+usuario.perfil)
 if(usuario.perfil ==='estandar'){
     setEstadoElemento('true')
 }

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
              onChange={handleChange}
              
            />
          </FormControl>
          <FormControl className="anchoCompleto">
            <TextField
              name="descripcion"
              id="descripcion"
              label="Descripcion"
              multiline
              rows={16}
              variant="outlined"
              onChange={handleChange}
              // Col={16}
            />
          </FormControl>
        </Col>
        <Col span={6} pull={18}>
          <FormControl variant="outlined" className="anchoCompleto">
            <InputLabel id="dependencia">Dependencia</InputLabel>
            <Select
              labelId="dependencia"
              name="dependencia"
              id="dependencia"
              value={dependencia}
              onChange={handleChange}
              label="Dependencia"
              disabled = {estadoElemento}
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
              onChange={handleChange}
              label="Categoria"
              disabled = {estadoElemento}
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
              onChange={handleChange}
              label="Tipo"
              disabled = {estadoElemento}
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
              onChange={handleChange}
              label="Prioridad"
              disabled = {estadoElemento}
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            size="large"
            type="submit"
            onClick={onSubmitEditar}
          >
            Editar Ticket
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

 
export default EditarTickets;