import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerTicketsAction } from "../../actions/ticketsActions";

import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Tag, Tabs } from "antd";

import {
  FullscreenExitOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const Tickets = ({ history }) => {
  //invocando paneles
  const { TabPane } = Tabs;

  //OBTENER LOS TICKETS EL STATE O STORE

  const error = useSelector((state) => state.tickets.error);
  const mensajeError = useSelector((state) => state.tickets.mensajeError);
  const tickets = useSelector((state) => state.tickets.tickets);
  const token = useSelector((state) => state.auth.token);

  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    //consultar API
    console.log('token desde ticket ', token)
    console.log('token desde ticket localstorgae',localStorage.getItem("gessys_token"))
    const cargarTickets = () => dispatch(obtenerTicketsAction(token));
    cargarTickets();
  }, []);

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
  } = tickets;

  //#region DATOS  TABLA
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
 
 //funcion para capturar tab seleccionado
  function callback(key) {
    console.log(key);
  }
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Tickets"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      >

        {error ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {mensajeError
              ? mensajeError
              : "Se ha presentado un error, comuniquese con el área de soporte"}
          </Tag>
        ) : null}

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="NUEVOS" key="1">
          <MaterialTable
          columns={columns}
          data={tickets}
          title=""
          actions={[
            {
              icon: "edit",
              tooltip: "Editar Ticket",
              onClick: (event, rowData) => alert("Vas a editar " + rowData._id),
            },
            // {
            //   icon: "delete",
            //   tooltip: "Eliminar Ticket",
            //   onClick: (event, rowData) =>
            //     alert("has seleccionado editar " + rowData.titulo),
            // },
          ]}
          onRowClick={(evt, selectedRow) => {
            setSelectedRow(selectedRow.tableData.id);
            //history.push('/tickets/editar');
            alert(setSelectedRow(selectedRow.tableData.id));
          }}
          options={{
            actionsColumnIndex: -1,
            // selection: true, //para activar los input de selección
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            }),
          }}
          localization={{
            header: {
              actions: "Acciones",
            },
          }}
          //onSelectionChange={(event, rowdata) => alert('You selected ' + rowdata._id)}
          // onSelectionChange={(rows) => alert('has seleccionado editar ' + rowData.titulo)}
        />
          </TabPane>
          <TabPane tab="RESUELTOS" key="2">
            RESUELTOS
          </TabPane>
          <TabPane tab="EN PROCESO" key="3">
            EN PROCESO
          </TabPane>
          <TabPane tab="CANCELADOS" key="4">
            CANCELADOS
          </TabPane>
        </Tabs>

      </Card>
    </div>
  );
};

export default Tickets;
