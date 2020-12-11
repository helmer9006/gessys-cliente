import React, { useState } from "react";
import { Card, Input, Tag, Select, Table, Tooltip, Button } from "antd";

//ACTIONS DE REDUX
import { crearNuevoTicketAction } from "../actions/ticketsActions";
import {
  FullscreenExitOutlined,
  AudioOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Tickets = () => {
  const [ticketSeleccionado, setTicketSeleccionado] = useState({});
  const [ticket, setTicket] = useState({});

  //FUNCION PARA CAPTURAR ITEM SELECCIONADO
  const seleccionarTicket = (ticket) => {
    ticketSeleccionado(ticket);
    console.log(ticket);
  };

  //DATOS PARA TABLA
  const dataSource = [
    {
      codigo: "SIS-0001",
      titulo: "Liber salina ADM 895221",
      descripcion: "Liberar salida del dia 24 a las 23 h",
      categoria: "CCTV",
      creacion: "12-03-2020 09:24",
    },
  ];

  //#region COLUMNAS TABLAS
  //FACTURAS
  const columns = [
    { title: "Codigo", dataIndex: "codigo", key: "codigo" },
    { title: "Titulo", dataIndex: "titulo", key: "titulo" },
    { title: "Descripcion", dataIndex: "descripcion", key: "descripcion" },
    { title: "Categoria", dataIndex: "categoria", key: "categoria" },
    { title: "Creación", dataIndex: "creacion", key: "creacion" },
    {
      title: "Actualizacion",
      dataIndex: "actualizacion",
      key: "actualizacion",
    },
    {
      title: "Accción",
      dataIndex: "",
      key: "x",
      render: (fila) => (
        <Tooltip title="Eliminar">
          <Button
            type="danger"
            shape="circle"
            onClick={() => seleccionarTicket(fila)}
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      ),
    },
  ];
  //#endregion

  //SELECCIONAR TICKET

  // const onSelectChange = selectedRowKeys => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys });
  // };

  //   const { loading, selectedRowKeys } = this.state;
  //   const rowSelection = {
  //     selectedRowKeys,
  //     onChange: this.onSelectChange,
  //   };
  //   const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Tickets"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      >
        <Table
          style={{ marginTop: "2rem" }}
          columns={columns}
          dataSource={dataSource}
          // rowSelection={rowSelection}
        />
      </Card>
    </div>
  );
};

export default Tickets;
