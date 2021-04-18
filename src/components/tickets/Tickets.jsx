import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerTicketsAction } from "../../actions/ticketsActions";

//MATERIAL UI
import { Link } from "react-router-dom";
import { Card,Tabs } from "antd";
import TablaTickets from "./tablaTickets";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TabsUI from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//ANT DESING
import {
  FullscreenExitOutlined,
} from "@ant-design/icons";

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
  const [value, setValue] = useState(0); //estado tab para filtro tickets y mis tickets seleccionado
  const [valueEstado, setValueEstado] = useState(0); // estado tab de filtro por estado seleccionado

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTicketsFiltrados(filtrarTickets(tickets, valueEstado, newValue));
  };

  const handleChangeEstados = (e, newValue) => {
    setValueEstado(newValue);
    setTicketsFiltrados(filtrarTickets(tickets, newValue, value));
  };
  //#endregion

  //#region OBTENER ESTADOS DEL STORE
  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();
  const obtenerTickets = () => dispatch(obtenerTicketsAction());

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
      default:
        break;
    }
    return res;
  };

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
      {/* <Card
        title="Tickets"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      > */}
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
        <Link to={`tickets/nuevo`}>
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "fixed", bottom: 15, right: 15 }}
          >
            <AddIcon />
          </Fab>
        </Link>
      {/* </Card> */}
    </div>
  );
};

export default Tickets;
