import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerTicketsAction } from "../../actions/ticketsActions";

import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Tag, Tabs } from "antd";
import TablaTickets from "./tablaTickets";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TabsUI from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {
  FullscreenExitOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tickets = ({ history }) => {
  //INVOCANDO PANELES PARA EL TAB

  const { TabPane } = Tabs;

  //STATE LOCAL

  const [estadoTicket, setEstadoTicket] = useState("nuevo");
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();

  //#region OBTENER ESTADOS DEL STORE

  const error = useSelector((state) => state.tickets.error);
  const mensajeError = useSelector((state) => state.tickets.mensajeError);
  const tickets = useSelector((state) => state.tickets.tickets);
  const token = useSelector((state) => state.auth.token);

  //#endregion
  useEffect(() => {
    //consultar API
    const cargarTickets = () => dispatch(obtenerTicketsAction());
    cargarTickets();
  }, []);

  //#region FILTRAR LOS TICKET POR ESTADO PARA MOSTRAR EN TAB CORRESPONDIENTE

  const ticketsFiltrados = tickets.filter(
    (item) => item.estado === `${estadoTicket}`
  );

  //ESTRUCTURAR TICKETS
  const formato = (ticketsFiltrados) => {
    let datos = [];
    ticketsFiltrados.map((item) => {
      let objeto = {};
      for (let indice in item) {
        if (indice === "categoria") {
          objeto[indice] = item[indice]._id;
          objeto["nombreCategoria"] = item[indice].nombre;
        } else if (indice === "dependencia") {
          objeto[indice] = item[indice]._id;
          objeto["nombreDependencia"] = item[indice].nombre;
        } else if (indice === "usuario") {
          objeto[indice] = item[indice]._id;
          objeto["nombreUsuario"] = item[indice].nombre;
        } else {
          objeto[indice] = item[indice];
        }
      }
      datos.push(objeto);
    });
    return datos;
  };

  const valores = formato(ticketsFiltrados);
  //#endregion

  //#region CAPTURAR TAB SELECCIONADO

  function cambiaTab(key) {
    setEstadoTicket(key);
  }
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
  ] = valores;
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

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Tickets"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      >
        {/* {error ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {mensajeError
              ? mensajeError
              : "Se ha presentado un error, comuniquese con el área de soporte"}
          </Tag>
        ) : null} */}
        <Paper className={classes.root} >
          <TabsUI
            value={value}
            onChange={handleChange}
            indicatorColor="#primary"
            textColor="primary"
            centered
          >
            <Tab label="OTROS TICKETS" />
            <Tab label="MIS TICKETS" />
          </TabsUI>
        </Paper>
        <Paper className={classes.root} >
          <TabsUI
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"

          >
            <Tab label="OTROS TICKETS" />
            <Tab label="MIS TICKETS" />
          </TabsUI>
        </Paper>
        
        <Tabs defaultActiveKey="nuevo" onChange={cambiaTab}>
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
        </Tabs>
      
      </Card>
    </div>
  );
};

export default Tickets;
