import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from 'antd';
import esEs from 'antd/lib/locale/es_ES';

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

ReactDOM.render( <
    ConfigProvider locale = { esEs } >
    <
    Provider store = { store } >
    <
    Router >
    <
    App / >
    <
    /Router> < /
    Provider > <
    /ConfigProvider>,
    document.getElementById("root")
);