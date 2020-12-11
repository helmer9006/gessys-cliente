import React from "react";
import { Card, Input } from "antd";
//ACTIONS DE REDUX
import { FullscreenExitOutlined, AudioOutlined } from "@ant-design/icons";


const Configuracion = () => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Configuración"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      ></Card>
    </div>
  );
};

export default Configuracion;
