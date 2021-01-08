import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login";
import Usuarios from "./components/Usuarios";
import Configuracion from "./components/Configuracion";
import Tickets from "./components/tickets/Tickets";
import NuevoTicket from "./components/tickets/NuevoTicket";
import EditarTicket from "./components/tickets/EditarTicket";
import ComponentMenu from "./components/Menu";

//REDUX
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
  withRouter,
} from "react-router-dom";
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
