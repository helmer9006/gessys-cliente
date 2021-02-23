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
  const tickets = useSelector((state) => state.tickets.tickets);
  const token = useSelector((state) => state.auth.token);
  const usuarioState = useSelector((state) => state.auth.usuario);
  const [ticketsFiltrados, setTicketsFiltrados] = useState([]);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [valueEstado, setValueEstado] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTicketsFiltrados(filtrarTickets(tickets, valueEstado, newValue));
  };

  const handleChangeEstados = (e, newValue) => {
    setValueEstado(newValue);
    setTicketsFiltrados(filtrarTickets(tickets, newValue, value));
  };

  const dispatch = useDispatch();
  const obtenerTickets = () => dispatch(obtenerTicketsAction());

  //#endregion

  //#region OBTENER ESTADOS DEL STORE
  useEffect(() => {
    //consultar API
    obtenerTickets();

    //#endregion
  }, []);

  //#region FILTRAR LOS TICKET POR ESTabTADO PARA MOSTRAR EN TAB CORRESPONDIENTE

  const filtrarTickets = (ticketsArg, EstadoArg, valueArg) => {
    let listEstados = ["nuevo", "proceso", "resuelto", "cancelado"];

    let res = [];
    const { id, dependencia } = usuarioState;
    console.log("ticket", ticketsArg);
    console.log("valueArg", valueArg);
    switch (valueArg) {
      case 1: //TICKETS
        console.log("1");
        res = ticketsArg.filter(
          (item) =>
            item.estado === listEstados[EstadoArg] &&
            item.dependencia === dependencia
        );
        console.log("res", res);
        console.log("ticket", ticketsArg);
        break;
      case 0: //MIS TICKETS
        console.log("2");

        res = ticketsArg.filter(
          (item) =>
            item.estado === listEstados[EstadoArg] && item.usuario === id
        );
        console.log("res", res);
        console.log("ticket", ticketsArg);
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
              <Tab label="MIS TICKETS" className={classes.tab} id="nuevos"/>
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
