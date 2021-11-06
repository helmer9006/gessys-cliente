import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Dashboard from "./components/dashboard/Dashboard";
import Usuarios from "./components/usuarios/Usuarios";
import NuevoUsuarios from "./components/usuarios/NuevoUsuario";
import EditarUsuario from "./components/usuarios/EditarUsuario";
import Configuracion from "./components/Configuracion";
import Tickets from "./components/tickets/Tickets";
import NuevoTicket from "./components/tickets/NuevoTicket";
import EditarTicket from "./components/tickets/EditarTicket";
import ComponentMenu from "./components/Menu";
import Login from "./components/Login";
import { useHistory } from "react-router-dom";
import Avatar from "./components/Avatar";
import InventarioIndex from "./components/inventario/containers/index";
import InventarioCreate from "./components/inventario/containers/create";
import InventarioShow from "./components/inventario/containers/show";
import Reportes from "./components/reportes/Reportes";
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
  // Avatar,
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

import Typography from "@material-ui/core/Typography";

//REDUX
import { Provider } from "react-redux";
import store from "./store";

const { Header, Content, Footer, Sider } = Layout;

//Funcionar copyright pie de página

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {" Gessys Copyright © by "}
      <a color="inherit" href="https://www.linkedin.com/in/helmer-villarreal-desarrolador-web-full-stack-a9129019a/">
        Helmer Villarreal
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const App = () => {
  const history = useHistory();

  //extraer usuario autenticado del storage
  const extraerUsuarioStorage = () => dispatch(extraerUsuarioStorageAction());


  useEffect(() => {
    if (localStorage.getItem("gessys_token") != null) {
      extraerUsuarioStorage();
    }
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
    history.push("/");
  }

  //recuperar variable de estado del Login
  //const isLogin = useSelector((state) => state.auth.isLogin);

  const Auth = useSelector((state) => state.auth);
  const { isLogin, usuario } = Auth;

  //ITEMS MENU AUTH
  const menuAuth = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  //FUNCION PARA VALIDAR TOKEN GUARDADOP EN STORAGE

  return (
    <>
      {isLogin ? (
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
              <Row type="flex" align="middle" justify="end" height="30px">
                <p style={{ margin: "15px" }}>
                  Hola, <strong> {usuario.nombre}</strong>
                </p>

                <Dropdown.Button
                  overlay={menuAuth}
                  placement="bottomCenter"
                  icon={<UserOutlined />}
                ></Dropdown.Button>
              </Row>
            </Header>
            <Content style={{ margin: " 0px 0px" }}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/tickets" component={Tickets} />
                <Route exact path="/tickets/nuevo" component={NuevoTicket} />
                <Route
                  exact
                  path="/tickets/editar/:id"
                  component={EditarTicket}
                />
                <Route exact path="/usuarios" component={Usuarios} />
                <Route exact path="/reportes" component={Reportes} />
                <Route exact path="/configuracion" component={Configuracion} />


                <Route exact path="/usuarios/nuevo" component={NuevoUsuarios} />
                <Route
                  exact
                  path="/usuarios/editar/:id"
                  component={EditarUsuario}
                />
                <Route exact path="/inventario" component={InventarioIndex} />
                <Route
                  exact
                  path="/inventario/nuevo"
                  component={InventarioCreate}
                />
                <Route
                  exact
                  path="/inventario/:id"
                  component={InventarioShow}
                />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              <Copyright />
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
