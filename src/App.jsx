import React, { useState } from "react";
import { Layout } from "antd";
import Usuarios from "./components/Usuarios";
import Configuracion from "./components/Configuracion";
import Tickets from "./components/Tickets";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Home from "./components/Home"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//REDUX
import { Provider } from "react-redux";
import store from "./store";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
