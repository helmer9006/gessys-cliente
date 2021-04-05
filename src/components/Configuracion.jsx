import React from "react";
import { Card } from "antd";
//ACTIONS DE REDUX
import { FullscreenExitOutlined } from "@ant-design/icons";


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
