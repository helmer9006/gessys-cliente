import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerTicketsAction } from "../../actions/ticketsActions";

import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Tag, Tabs } from "antd";
import TablaTickets from "./tablaTickets";

import {
  FullscreenExitOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

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
  //#endregion

  //#region CAPTURAR TAB SELECCIONADO

  function callback(key) {
    setEstadoTicket(key);
  }
  //#endregion

  //#region DESTRUCTURING DE TICKETS
  const {
    _id,
    actualizacion,
    categoria,
    codigo,
    creacion,
    dependencia,
    descripcion,
    estado,
    mensaje,
    prioridad,
    tipo,
    titulo,
    usuario,
  } = ticketsFiltrados;

  //#endregion

  //#region DATOS TABLA
  const data = [
    {
      codigo: codigo,
      titulo: titulo,
      descripcion: descripcion,
      categoria: categoria,
      creacion: creacion,
    },
  ];
  //#endregion

  //#region COLUMNAS TABLA

  const columns = [
    { title: "Codigo", field: "codigo" },
    { title: "Titulo", field: "titulo" },
    { title: "Descripcion", field: "descripcion" },
    { title: "Categoria", field: "categoria" },
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
        {/* {error ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {mensajeError
              ? mensajeError
              : "Se ha presentado un error, comuniquese con el área de soporte"}
          </Tag>
        ) : null} */}

        <Tabs defaultActiveKey="nuevo" onChange={callback}>
          <TabPane tab="NUEVOS" key="nuevo">
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPane>
          <TabPane tab="RESUELTOS" key="resuelto">
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPane>
          <TabPane tab="EN PROCESO" key="proceso">
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPane>
          <TabPane tab="CANCELADOS" key="cancelado">
            <TablaTickets
              tickets={ticketsFiltrados}
              data={data}
              columns={columns}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Tickets;
