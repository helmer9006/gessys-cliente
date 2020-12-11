import React, { useState } from "react";
import { Layout } from "antd";
import Usuarios from "./Usuarios";
import Configuracion from "./Configuracion";
import Tickets from "./Tickets";
import Menu from "./Menu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//REDUX
import { Provider } from "react-redux";
import store from "../store";

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          {/* <img src="../assets/img/logo.png" alt=""/> */}

          <Menu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "20px 16px" }}>
            <Switch>
              Login
              <Route exact path="/tickets" component={Tickets} />
              <Route exact path="/configuracion" component={Configuracion} />
              <Route exact path="/usuarios" component={Usuarios} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Gestión UCM ©2020 Creado por Helmer Villarreal
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Home;
