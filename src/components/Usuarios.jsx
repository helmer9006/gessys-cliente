import React from "react";
import { Card, Input } from "antd";
//ACTIONS DE REDUX
import { FullscreenExitOutlined, AudioOutlined } from "@ant-design/icons";

const Usuarios = () => {
  return (
    <div className="site-card-border-less-wrapper">
    <Card
      title="Usuarios"
      bordered={false}
      style={{ width: FullscreenExitOutlined }}
    >
      
    </Card>
  </div>
  );
};

export default Usuarios;
