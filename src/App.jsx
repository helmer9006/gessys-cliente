import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Usuarios from "./components/Usuarios";
import Configuracion from "./components/Configuracion";
import Tickets from "./components/tickets/Tickets";
import NuevoTicket from "./components/tickets/NuevoTicket";
import EditarTicket from "./components/tickets/EditarTicket";
import ComponentMenu from "./components/Menu";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
  withRouter,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //para acceder al store
import {
  CerrarSesionUsuarioAction,
  extraerUsuarioStorageAction,
} from "./actions/authActions";

//ANT DESING
import {
  Avatar,
  Row,
  Menu,
  Dropdown,
  Button,
  message,
  Space,
  Tooltip,
  Col,
} from "antd";
import {
  DownOutlined,
  PlusOutlined,
  UserOutlined,
  LogoutOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

//REDUX
import { Provider } from "react-redux";
import store from "./store";

const { Header, Content, Footer, Sider } = Layout;

const App = ({ history }) => {
  //extraer usuario autenticado del storage

  const extraerUsuarioStorage = () => dispatch(extraerUsuarioStorageAction());

  useEffect(() => {
    extraerUsuarioStorage();
  }, []);

  const location = useLocation();
  // console.log('esta es la ruta '  , location.pathname)

  // utilizar use dispatch para crear una función
  const dispatch = useDispatch();

  // mandar llamar el action de productoAction
  const CerrarSesionUsuario = () => dispatch(CerrarSesionUsuarioAction());

  //STATE LOCAL
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

  //FUNCION PARA CERRAR SESION
  function handleMenuClick(e) {
    CerrarSesionUsuario();
    message.info({
      content: "Sesión cerrada correctamente.",
      className: "custom-class",
      duration: 3,
      style: {
        // marginTop: '20vh',
      },
    });
  }

  //recuperar variable de estado del Login
  //const isLogin = useSelector((state) => state.auth.isLogin);

  const Auth = useSelector((state) => state.auth);
  const { isLogin, usuario } = Auth;

  //FUNCION PARA VALIDAR TOKEN GUARDADOP EN STORAGE

  return (
    <>
      { isLogin ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <img src="../assets/img/logo.png" alt="" />

            <ComponentMenu />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ padding: "20px" }}
            >
              <Row
                type="flex"
                align="middle"
                justify="end"
                // style={{ height: "100%" }}
              >
                <p style={{ margin: "15px" }}>
                  {" "}
                  Hola  <strong> {usuario.nombre}</strong>
                </p>
                {location.pathname != "/configuracion" ? (
                  <Link to={`${location.pathname}/nuevo`}>
                    <Button type="primary" icon={<PlusOutlined />}>
                      Nuevo
                    </Button>
                  </Link>
                ) : null}
                 {/* <Avatar size="large" icon={<UserOutlined />} /> */}
                
                <Dropdown.Button
                  overlay={menuAuth}
                  placement="bottomCenter"
                  icon={<UserOutlined />}
                ></Dropdown.Button>
              </Row>
            </Header>
            <Content style={{ margin: "20px 16px" }}>
              <Switch>
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
    </>
  );
};

export default App;
