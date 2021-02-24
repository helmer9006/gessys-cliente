import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerTicketsAction } from "../../actions/ticketsActions";

//MATERIAL UI
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Tag, Tabs } from "antd";
import TablaTickets from "./tablaTickets";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TabsUI from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import AppBar from "@material-ui/core/AppBar";

//ANT DESING
import {
  FullscreenExitOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import Pruebas from "./prueba";

const useStyles = makeStyles(() => ({
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
}));

//FUNCION QUE RETORNA EL TAB PANELES
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={1}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Tickets = ({ history }) => {
  //INVOCANDO PANELES PARA EL TAB

  const { TabPane } = Tabs;

  //STATE LOCAL

  // const [estadoTicket, setEstadoTicket] = useState("nuevo");
  // const [selectedRow, setSelectedRow] = useState(null);
  const error = useSelector((state) => state.tickets.error);
  const mensajeError = useSelector((state) => state.tickets.mensajeError);

  const token = useSelector((state) => state.auth.token);
  const usuarioState = useSelector((state) => state.auth.usuario);
  const [ticketsFiltrados, setTicketsFiltrados] = useState([
    {
      _id: "",
      actualizacion: "",
      categoria: "",
      nombreCategori: "",
      codigo: "",
      creacion: "",
      descripcion: "",
      estado: "",
      mensaje: "",
      prioridad: "",
      tipo: "",
      titulo: "",
    },
  ]);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [valueEstado, setValueEstado] = useState(0);

  //   const res = [{
  //     codigo: 9,
  //     estado: 'nuevo',
  //     mensaje: [],
  //     _id: '6031f1a2758e6a70a0406784',
  //     titulo: 'MI TICKET DE ENFERMERIA',
  //     descripcion: 'pruebaaaaaaaaaa\na\nsdf\na\nsdf\nasdf',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'baja',
  //     usuario: '60171536dcde3d8f74b775ed',
  //     nombreUsuario: 'Enfermera Sexto Piso',
  //     creacion: '2021-02-21T05:37:38.251Z',
  //     __v: 0
  //   },
  //   {
  //     codigo: 8,
  //     estado: 'cancelado',
  //     mensaje: [],
  //     _id: '6031c1af71a7a65f70c88030',
  //     titulo: 'TICKET DE SISTEMAS PARA OTRA',
  //     descripcion: 'asdfasdfasdf',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'baja',
  //     usuario: '6014d092b7c2825d34cf447a',
  //     nombreUsuario: 'Helmer Villarreal',
  //     creacion: '2021-02-21T02:13:03.855Z',
  //     __v: 0,
  //     actualizacion: '2021-02-21T04:38:46.858Z'
  //   },
  //   {
  //     codigo: 7,
  //     estado: 'proceso',
  //     mensaje: [],
  //     _id: '601e0173f2c5d176e5e39646',
  //     creacion: '2021-02-06T02:39:32.220Z',
  //     titulo: 'PRUEBA FECHA',
  //     descripcion: 'ok',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'baja',
  //     usuario: '6014d092b7c2825d34cf447a',
  //     nombreUsuario: 'Helmer Villarreal',
  //     __v: 0,
  //     actualizacion: '2021-02-21T04:39:20.321Z'
  //   },
  //   {
  //     codigo: 6,
  //     estado: 'nuevo',
  //     mensaje: [],
  //     _id: '601e00ade258167271625f0d',
  //     titulo: 'PRUEBA FECHA UPDATE',
  //     descripcion: 'prueba fecha',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'baja',
  //     usuario: '6014d092b7c2825d34cf447a',
  //     nombreUsuario: 'Helmer Villarreal',
  //     creacion: '2021-02-06T02:36:29.835Z',
  //     __v: 0,
  //     actualizacion: '2021-02-06T02:36:54.303Z'
  //   },
  //   {
  //     codigo: 5,
  //     estado: 'resuelto',
  //     mensaje: [],
  //     _id: '60175e063f130b9354111e33',
  //     titulo: 'ERROR DE EPICRISIS',
  //     descripcion: 'epircrisis con error en la fecha',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'baja',
  //     usuario: '60171536dcde3d8f74b775ed',
  //     nombreUsuario: 'Enfermera Sexto Piso',
  //     creacion: '2021-02-01T01:48:54.178Z',
  //     __v: 0,
  //     actualizacion: '2021-02-01T04:20:23.661Z'
  //   },
  //   {
  //     codigo: 4,
  //     estado: 'resuelto',
  //     mensaje: [],
  //     _id: '60157869f8bc8fbd1c6f3a93',
  //     titulo: 'ELIMINAR EVOLUCION',
  //     descripcion: 'eliminar evolucion de ayer',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'baja',
  //     usuario: '6014d092b7c2825d34cf447a',
  //     nombreUsuario: 'Helmer Villarreal',
  //     creacion: '2021-01-30T15:16:57.026Z',
  //     __v: 0,
  //     actualizacion: '2021-02-01T01:58:35.500Z'
  //   },
  //   {
  //     codigo: 3,
  //     estado: 'cancelado',
  //     mensaje: [],
  //     _id: '6015437bf8bc8fbd1c6f3a92',
  //     titulo: 'PRUEBA',
  //     descripcion: 'prueba',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'media',
  //     usuario: '6014d092b7c2825d34cf447a',
  //     nombreUsuario: 'Helmer Villarreal',
  //     creacion: '2021-01-30T11:31:07.087Z',
  //     __v: 0,
  //     actualizacion: '2021-02-01T01:59:10.025Z'
  //   },
  //   {
  //     codigo: 2,
  //     estado: 'nuevo',
  //     mensaje: [],
  //     _id: '6015308911259c84fcc22e72',
  //     titulo: 'ARREGLO AMPICILINA UPDATE',
  //     descripcion: 'no se deja registrar hoy a las 22 h',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'media',
  //     usuario: '6014d092b7c2825d34cf447a',
  //     nombreUsuario: 'Helmer Villarreal',
  //     creacion: '2021-01-30T10:10:17.122Z',
  //     __v: 0,
  //     actualizacion: '2021-02-01T02:07:51.408Z'
  //   },
  //   {
  //     codigo: 1,
  //     estado: 'nuevo',
  //     mensaje: [],
  //     _id: '6014d5d240f9ee5598309baa',
  //     titulo: 'ARREGLAR HC ADM 912525',
  //     descripcion: 'arreglo de historia clincia',
  //     tipo: 'soporte',
  //     dependencia: '6014cf4f7c97f543c4e9233b',
  //     nombreDependencia: 'SISTEMAS',
  //     categoria: '6014d2bf5f0dec0f105498f6',
  //     nombreCategoria: 'MEDICAMENTOS',
  //     prioridad: 'alta',
  //     usuario: '6014d092b7c2825d34cf447a',
  //     nombreUsuario: 'Helmer Villarreal',
  //     creacion: '2021-01-30T03:43:14.925Z',
  //     __v: 0
  //   }
  // ]
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTicketsFiltrados(filtrarTickets(tickets, valueEstado, newValue));
  };

  const handleChangeEstados = (e, newValue) => {
    setValueEstado(newValue);
    setTicketsFiltrados(filtrarTickets(tickets, newValue, value));
  };
  //#endregion

  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();
  const obtenerTickets = () => dispatch(obtenerTicketsAction());

  //#region OBTENER ESTADOS DEL STORE
  useEffect(() => {
    obtenerTickets();
    //#endregion
  }, []);

  useEffect(() => {
    if (!tickets) return;
    setTicketsFiltrados(filtrarTickets(tickets, valueEstado, value));
  }, [tickets]);

  //#region FILTRAR LOS TICKET POR ESTabTADO PARA MOSTRAR EN TAB CORRESPONDIENTE

  const filtrarTickets = (ticketsArg, EstadoArg, valueArg) => {
    let listEstados = ["nuevo", "proceso", "resuelto", "cancelado"];

    let res = null;
    const { id, dependencia } = usuarioState;
    switch (valueArg) {
      case 1: //TICKETS
        res = ticketsArg.filter(
          (item) =>
            item.estado === listEstados[EstadoArg] &&
            item.dependencia === dependencia
        );
        break;
      case 0: //MIS TICKETS
        res = ticketsArg.filter(
          (item) =>
            item.estado === listEstados[EstadoArg] && item.usuario === id
        );
        break;
    }

    return res;
  };

  // //ESTRUCTURAR TICKETS
  // // const formato = (res) => {
  // //   let datos = [];
  // //   res.map((item) => {
  // //     let objeto = {};
  // //     for (let indice in item) {
  // //       if (indice === "categoria") {
  // //         objeto[indice] = item[indice]._id;
  // //         objeto["nombreCategoria"] = item[indice].nombre;
  // //       } else if (indice === "dependencia") {
  // //         objeto[indice] = item[indice]._id;
  // //         objeto["nombreDependencia"] = item[indice].nombre;
  // //       } else if (indice === "usuario") {
  // //         objeto[indice] = item[indice]._id;
  // //         objeto["nombreUsuario"] = item[indice].nombre;
  // //       } else {
  // //         objeto[indice] = item[indice];
  // //       }
  // //     }
  // //     datos.push(objeto);
  // //   });
  // //   return datos;
  // // };

  // // const valores = formato(ticketsFiltrados);
  // //#endregion

  //#region CAPTURAR TAB SELECCIONADO

  // function cambiaTab(key) {
  //   setEstadoTicket(key);
  // }
  //#endregion

  //#region DESTRUCTURING DE TICKETS
  const [
    _id,
    actualizacion,
    categoria,
    nombreCategoria,
    codigo,
    creacion,
    descripcion,
    estado,
    mensaje,
    prioridad,
    tipo,
    titulo,
  ] = ticketsFiltrados;
  // console.log(ticketsFiltrados[0].categoria.nombre)
  // const {_id:idDependencia, nombre:nombreDependencia} = dependencia
  // const { _id:idUsuario, nombre:nombreUsuario} = usuario
  // const{ _id:idCategoria, nombre:nombreCategoria} = categoria
  //#endregion

  //#region DATOS TABLA
  const data = [
    {
      codigo: codigo,
      titulo: titulo,
      prioridad: prioridad,
      nombreCategoria: nombreCategoria,
      creacion: creacion,
    },
  ];
  //#endregion

  //#region COLUMNAS TABLA

  const columns = [
    { title: "Codigo", field: "codigo" },
    { title: "Titulo", field: "titulo" },
    { title: "Categoria", field: "nombreCategoria" },
    { title: "Prioridad", field: "prioridad" },
    { title: "Creación", field: "creacion" },
    { title: "Actualizacion", field: "actualizacion" },
  ];
  //#endregion

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Tickets"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      >
        {usuarioState.perfil === "administrador" ||
        usuarioState.perfil === "especial" ? (
          <Paper className={classes.root}>
            <TabsUI
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="MIS TICKETS" className={classes.tab} id="nuevos" />
              <Tab label="TICKETS" className={classes.tab} />
            </TabsUI>
          </Paper>
        ) : null}

        <div className={classes.root} style={{ marginTop: "20px" }}>
          <AppBar position="static" color="default">
            <TabsUI
              value={valueEstado}
              onChange={handleChangeEstados}
              //   variant="scrollable"
              //   scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              // aria-label="scrollable force tabs example"
              centered
            >
              <Tab label="nuevo" icon={<LocalOfferRoundedIcon />} />
              <Tab label="proceso" icon={<RepeatRoundedIcon />} />
              <Tab label="resuelto" icon={<DoneAllRoundedIcon />} />
              <Tab label="cancelado" icon={<CloseRoundedIcon />} />
            </TabsUI>
          </AppBar>
          <TabPanel value={valueEstado} index={0}>
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPanel>
          <TabPanel value={valueEstado} index={1}>
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPanel>
          <TabPanel value={valueEstado} index={2}>
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPanel>
          <TabPanel value={valueEstado} index={3}>
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPanel>
        </div>

        {/* <Tabs defaultActiveKey="nuevo" onChange={cambiaTab}>
          <TabPane tab="NUEVOS" key="nuevo">
            <TablaTickets tickets={valores} data={data} columns={columns} />
          </TabPane>

          <TabPane tab="EN PROCESO" key="proceso">
            <TablaTickets tickets={valores} data={data} columns={columns} />
          </TabPane>
          <TabPane tab="RESUELTOS" key="resuelto">
            <TablaTickets tickets={valores} data={data} columns={columns} />
          </TabPane>
          <TabPane tab="CANCELADOS" key="cancelado">
            <TablaTickets tickets={valores} data={data} columns={columns} />
          </TabPane>
        </Tabs> */}
      </Card>
    </div>
  );
};

export default Tickets;
