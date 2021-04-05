import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Col, message } from "antd";

//#region IMPORTANDO COMPONENTE DE MATERIAL-UI
import {
  FormControl,
  InputLabel,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

//#endregion

//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerDependenciasAction } from "../../actions/dependenciasActions";
import { obtenerCategoriasAction } from "../../actions/categoriasActions";
import { CrearTicketsAction } from "../../actions/ticketsActions";
import { obtenerTicketsAction } from "../../actions/ticketsActions";
import { obtenerInventarioCategoriaAction } from "../../actions/inventarioActions";

const NuevoTicket = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  //
  const [ticket, setTicket] = useState({
    //codigo - hacer consulta al api, traer el ultio y aumentar codigo
    titulo: "",
    descripcion: "",
    tipo: "soporte",
    dependencia: "",
    categoria: "",
    inventario: "",
    prioridad: "baja",
  }); //colocar por defecto la categoria y dependencia mas usadas

  const [hiddenInventario, setHiddenInventario] = useState(true);
  //DESTRUCTURING
  const {
    titulo,
    descripcion,
    tipo,
    dependencia,
    categoria,
    inventario,
    prioridad,
  } = ticket;

  //#region OBTENER ESTADOS DEL STORE

  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.dependencias.error);
  const mensajeError = useSelector((state) => state.dependencias.mensajeError);
  const dependencias = useSelector((state) => state.dependencias.dependencias);
  const categorias = useSelector((state) => state.categorias.categorias);
  const inventarioPorCategoria = useSelector(
    (state) => state.inventario.inventarioPorCategoria
  );

  //#endregion

  useEffect(() => {
    //consultar API
    const cargarDependencias = () => dispatch(obtenerDependenciasAction());
    const cargarCategorias = () => dispatch(obtenerCategoriasAction());
    cargarDependencias();
    cargarCategorias();
  }, []);

  useEffect(() => {
    setTicket({
      ...ticket,
      categoria: "",
    });
  }, [dependencia]);

  useEffect(() => {
    if (!categoria) return;
    setHiddenInventario(true);
    dispatch(obtenerInventarioCategoriaAction(categoria));
  }, [categoria]);

  // if(inventarioPorCategoria.length > 0){
  //   setHiddenInventario('false')
  // }

  useEffect(() => {
    if (inventarioPorCategoria.length === 0) return;
    setHiddenInventario(false);
  }, [inventarioPorCategoria]);

  const handleChange = (event) => {
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value,
    });
  };

  //mandar a llamar el action de tickets
  // mandar llamar el action de ticketAction
  const crearTicket = (ticket) => dispatch(CrearTicketsAction(ticket));

  const onSubmit = async (event) => {
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
        content: "Algunos son obligatorios",
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
      return;
    }
    //SINO HAY ERRORES

     await crearTicket(ticket);
    dispatch(obtenerTicketsAction());
    history.push("/tickets");
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

  //#CREANDO OPCIONES DE INVENTARIO
  const OpcionesInventario = [];
  inventarioPorCategoria.forEach((element) => {
    OpcionesInventario.push(
      <MenuItem key={element._id} value={element._id}>
        {element.codigo} - {element.marca} {element.modelo}
      </MenuItem>
    );
  });

  //#endregion

  return (
    <Card title="Agregando Nuevo Ticket">
      <Row gutter={[8, 8]}>
        <Col span={18} push={6}>
          <FormControl className="anchoCompleto">
            <TextField
              name="titulo"
              label="Titulo"
              variant="outlined"
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
            >
              <MenuItem value="">
                <em>Seleccionar Categoria</em>
              </MenuItem>
              {OpcionesCategorias}
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            className="anchoCompleto"
            label="inventario"
            hidden={hiddenInventario}
          >
            <InputLabel id="inventario">Inventario/Inmueble</InputLabel>
            <Select
              labelId="inventario"
              name="inventario"
              id="inventario"
              value={inventario}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Seleccionar Inventario</em>
              </MenuItem>
              {OpcionesInventario}
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
            onClick={onSubmit}
          >
            Guardar Ticket
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default NuevoTicket;
