import React, { useState } from "react";
import { Layout } from "antd";
import Usuarios from "./components/Usuarios";
import Configuracion from "./components/Configuracion";
import Tickets from "./components/tickets/Tickets";
import NuevoTicket from "./components/tickets/NuevoTicket";
import EditarTicket from "./components/tickets/EditarTicket";
import ComponentMenu from "./components/Menu";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //para acceder al store
import { CerrarSesionUsuarioAction } from "./actions/authActions";
//ANT DESING
import { Row, Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

//REDUX
import { Provider } from "react-redux";
import store from "./store";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {

  // utilizar use dispatch para crear una función
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.auth.isLogin);

  // mandar llamar el action de productoAction
  const CerrarSesionUsuario = () => dispatch( CerrarSesionUsuarioAction());


  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  //ITEMS MENU AUTH
  const menuAuth = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  function handleMenuClick(e) {
    CerrarSesionUsuario()
    message.success({
      content: 'Sesión Cerrada',
      className: 'custom-class',
      duration: 3,
      style: {
        // marginTop: '20vh',
      },
    });

  }

  return (
    <Router>
      {isLogin ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <img src="../assets/img/logo.png" alt="" />

            <ComponentMenu />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: '20px' }}>
              <Row type="flex" align="middle" justify="end" style={{height: "100%"}}>
                <Dropdown.Button
                  overlay={menuAuth}
                  placement="bottomCenter"
                  icon={<UserOutlined />}
                ></Dropdown.Button>
              </Row>
            </Header>
            <Content style={{ margin: "20px 16px" }}>
              <Switch>
                {/* <Route exact path="/" component={Login} /> */}
                <Route exact path="/tickets" component={Tickets} />
                <Route exact path="/tickets/nuevo" component={NuevoTicket} />
                <Route exact path="/tickets/editar" component={EditarTicket} />

                <Route exact path="/configuracion" component={Configuracion} />
                <Route exact path="/usuarios" component={Usuarios} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Gestión UCM ©2020 Creado por Helmer Villarreal
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </Router>
  );
};

export default App;
