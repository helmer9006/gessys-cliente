import React, { useEffect, useState } from "react";
import GraficoInventario from "./GraficoInventario";
import GraficoTickets from "./GraficoTickets";
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
  const tickets = useSelector((state) => state.tickets.tickets);
  const classes = useStyles();
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
                150
              </Title>
            </div>
          </Paper>
        </Col>
        <Col span={6}>
          <Paper className={classes.root}>
            <div style={{ padding: "20px" }}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>TICKETS</p>
              <Title style={{ textAlign: "center", fontSize: "35px" }}>
                320
              </Title>
            </div>
          </Paper>
        </Col>
        <Col span={6}>
          <Paper className={classes.root}>
            <div style={{ padding: "20px" }}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>USUARIOS</p>
              <Title style={{ textAlign: "center", fontSize: "35px" }}>
                40
              </Title>
            </div>
          </Paper>
        </Col>
        <Col span={6}>
          <Paper className={classes.root}>
            <div style={{ padding: "20px" }}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                DEPENDENCIAS
              </p>
              <Title style={{ textAlign: "center", fontSize: "35px" }}>
                50
              </Title>
            </div>
          </Paper>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Paper className={classes.root} style={{ padding: "10px" }}>
            <GraficoTickets />
          </Paper>
        </Col>
        <Col span={12}>
          <Paper className={classes.root}>
            <GraficoInventario />;
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
