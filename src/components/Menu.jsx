import React from "react";
import { Menu } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  MedicineBoxOutlined,
  AudioOutlined
} from "@ant-design/icons";

import { Link } from "react-router-dom";
const Menus = () => {
  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="2" icon={<MedicineBoxOutlined />}>
          <Link to="/tickets">Tickets</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/usuarios">Usuario</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          <Link to="/configuracion">Configuracion</Link>
        </Menu.Item>
      </Menu>

    </>
  );
};

export default Menus;
