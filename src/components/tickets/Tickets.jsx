import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerTicketsAction } from "../../actions/ticketsActions";

import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Tag } from "antd";

import {
  FullscreenExitOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const Tickets = ({history}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    //consultar API
    const cargarTickets = () => dispatch(obtenerTicketsAction());
    cargarTickets();
  }, []);

  //OBTENER LOS TICKETS EL STATE O STORE

  const error = useSelector((state) => state.tickets.error);
  const mensajeError = useSelector((state) => state.tickets.mensajeError);
  const tickets = useSelector((state) => state.tickets.tickets);
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

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Tickets"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      >
        <Row justify="end" style={{ margin: 10 }}>
          <Col span={24}>
            <Link to={"/tickets/nuevo"}>
              <Button type="primary" icon={<PlusOutlined />}>
                Nuevo
              </Button>
            </Link>
          </Col>
        </Row>
        {error ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {mensajeError
              ? mensajeError
              : "Se ha presentado un error, comuniquese con el área de soporte"}
          </Tag>
        ) : null}
        <MaterialTable
          columns={columns}
          data={tickets}
          title="Listado de tickets"
          actions={[
            {
              icon: "edit",
              tooltip: "Editar Ticket",
              onClick: (event, rowData) => alert('Vas a editar ' + rowData._id),
            },
            // {
            //   icon: "delete",
            //   tooltip: "Eliminar Ticket",
            //   onClick: (event, rowData) =>
            //     alert("has seleccionado editar " + rowData.titulo),
            // },
          ]}
          onRowClick={((evt, selectedRow) => {setSelectedRow(selectedRow.tableData.id)
            //history.push('/tickets/editar');
            alert(setSelectedRow(selectedRow.tableData.id))
          })}
          options={{
            actionsColumnIndex: -1,
            // selection: true, //para activar los input de selección
            rowStyle: rowData => ({
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            })
          }}
          localization={{
            header: {
              actions: "Acciones",
            },
          }}
           //onSelectionChange={(event, rowdata) => alert('You selected ' + rowdata._id)}
          // onSelectionChange={(rows) => alert('has seleccionado editar ' + rowData.titulo)}
        />
      </Card>
    </div>
  );
};

export default Tickets;
