import React, { useEffect, useState } from "react";
import GraficoInventario from "./GraficoInventario";
import GraficoTickets from "./GraficoTickets";
import clienteAxios from "./../../config/axios";
import tokenAuth from "./../../config/tokenAuth";

//ANT DESING
import { Card, Row, Col, Typography } from "antd";
import { Pie } from "@ant-design/charts";

//REDUX
import { useDispath, useSelector } from "react-redux";

//#region MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { FullscreenExitOutlined, AudioOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
//#endregion

const Dashboard = () => {
  const { Title } = Typography;

  //ESTADO GLOBAL
  const tickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    makeRequests();
  }, []);
  //INSTANCIA ESTILOS DE MATERIAL
  const classes = useStyles();

  // STATE LOCAL
  const [countEstadistico, setCountEstadistico] = useState({});

  const makeRequests = async () => {
    const token = localStorage.getItem("gessys_token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/dashboard");
      setCountEstadistico(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    cantMensajes,
    cantInventarios,
    cantTickets,
    cantUsuarios,
  } = countEstadistico;

  return (
    <div className="site-card-border-less-wrapper">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Paper className={classes.root}>
            <div style={{ padding: "20px" }}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                INVENTARIOS
              </p>
              <Title style={{ textAlign: "center", fontSize: "35px" }}>
                {cantInventarios}
              </Title>
            </div>
          </Paper>
        </Col>
        <Col span={6}>
          <Paper className={classes.root}>
            <div style={{ padding: "20px" }}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>TICKETS</p>
              <Title style={{ textAlign: "center", fontSize: "35px" }}>
                {cantTickets}
              </Title>
            </div>
          </Paper>
        </Col>
        <Col span={6}>
          <Paper className={classes.root}>
            <div style={{ padding: "20px" }}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>USUARIOS</p>
              <Title style={{ textAlign: "center", fontSize: "35px" }}>
                {cantUsuarios}
              </Title>
            </div>
          </Paper>
        </Col>
        <Col span={6}>
          <Paper className={classes.root}>
            <div style={{ padding: "20px" }}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>MENSAJES</p>
              <Title style={{ textAlign: "center", fontSize: "35px" }}>
                {cantMensajes}
              </Title>
            </div>
          </Paper>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Paper className={classes.root}>
            <GraficoTickets datos={countEstadistico} />
          </Paper>
        </Col>
        <Col span={12}>
          <Paper className={classes.root}>
            <GraficoInventario datos={countEstadistico} />
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
