import React, { useEffect, useState } from "react";
import { message } from "antd";
import Fab from "@material-ui/core/Fab";
import { Add, Visibility, Receipt } from "@material-ui/icons";
import MaterialTable from "material-table";

import axios from "../../../config/axios";
import tokenAuth from "../../../config/tokenAuth";

const Index = ({ history }) => {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    await getInventario();
  };

  const getInventario = async () => {
    try {
      const token = localStorage.getItem("gessys_token");
      token && tokenAuth(token);
      const response = await axios.get("/inventario");
      if (response.status === 200) {
        setInventario(response.data);
      } else {
        console.log("[Index] makeRequest", response);
      }
    } catch (e) {
      console.log("[Index] makeRequest error", e);
      message.error({
        content: "Algo salió mal",
        className: "custom-class",
        duration: 3,
      });
    }
  };

  const onDelete = async (id) => {
    let response = window.confirm("Confirmar la eliminación");
    if (response) {
      try {
        const token = localStorage.getItem("gessys_token");
        token && tokenAuth(token);
        const response = await axios.delete(`/inventario/${id}`);
        message.info(response.msg);
        getInventario();
      } catch (e) {
        console.log("[Index] onDelete error", e);
        message.error({
          content: "Algo salió mal",
          className: "custom-class",
          duration: 3,
        });
      }
    }
  };

  const onEdit = (id) => {
    history.push(`/inventario/${id}`);
  };

  const onCreate = () => {
    history.push("/inventario/nuevo");
  };

  const showAnexo = (item) => {
    console.log(item);
    if (item.anexo) {
      window.open(item.anexo);
    } else {
      message.error({
        content: "No hay anexo asociado",
        className: "custom-class",
        duration: 3,
      });
    }
  };

  const columns = [
    { title: "Codigo", field: "codigo" },
    { title: "Marca", field: "marca" },
    { title: "Modelo", field: "modelo" },
    { title: "No. serial", field: "serial" },
    { title: "fecha", field: "creacion" },
    { title: "estado", field: "estado" },
  ];

  return (
    <div className="site-card-border-less-wrapper">
      <MaterialTable
        columns={columns}
        data={inventario}
        title="Inventario"
        actions={[
          {
            icon: () => <Visibility color="primary" />,
            tooltip: "Detalle",
            onClick: (e, item) => onEdit(item._id),
          },
          {
            icon: () => <Receipt />,
            tooltip: "Anexo",
            onClick: (e, item) => showAnexo(item),
          },
          {
            icon: "delete",
            tooltip: "Eliminar",
            iconProps: { color: "secondary" },
            onClick: (e, item) => onDelete(item._id),
          },
        ]}
        // options={{
        //   actionsColumnIndex: -1,
        // }}
        options={{ actionsColumnIndex: -1, pageSize: 10, pageSizeOptions:[20, 30, 50] }}
      />
      <Fab
        onClick={onCreate}
        color="primary"
        aria-label="add"
        style={{ position: "absolute", bottom: 15, right: 15 }}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default Index;
