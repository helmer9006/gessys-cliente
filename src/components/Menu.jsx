import React from "react";
import { Menu } from "antd";

//REDUX
import { useSelector } from "react-redux";

import {
  UserOutlined,
  SettingOutlined,
  MedicineBoxOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
const Menus = () => {
  const usuario = useSelector((state) => state.auth.usuario);
  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {usuario.perfil === "administrador" ? (
          <>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MedicineBoxOutlined />}>
              <Link to="/tickets">Tickets</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/usuarios">Usuario</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              <Link to="/configuracion">Configuracion</Link>
            </Menu.Item>
          </>
        ) : usuario.perfil === "especial" ? (
          <>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MedicineBoxOutlined />}>
              <Link to="/tickets">Tickets</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              <Link to="/configuracion">Configuracion</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MedicineBoxOutlined />}>
              <Link to="/tickets">Tickets</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </>
  );
};

export default Menus;
