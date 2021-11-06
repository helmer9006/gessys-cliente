import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Col, message } from "antd";
import ReporteTicketsPorUsuario from './ReporteTicketsPorUsuario';
import { useDispatch, useSelector } from "react-redux";

//#region IMPORTANDO COMPONENTE DE MATERIAL-UI
import {
    FormControl,
    InputLabel,
    Button,
    TextField,
    Select,
    MenuItem,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
//#endregion

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { FullscreenExitOutlined } from '@ant-design/icons';
import { obtenerTicketsAction } from "../../actions/ticketsActions";



const Reportes = () => {

    const dispatch = useDispatch();

    //EJECUTANDO FUNCIONES DEL ACTION
    const obtenerTickets = () => dispatch(obtenerTicketsAction());
    const tickets = useSelector((state) => state.tickets.tickets);

    const [reportes, setReportes] = useState({
        reporte: "",
        fechainicio: "",
        fechafinal: "",
        usuario: ""
    });

    const handleChange = (event) => {
        setReportes({
            ...reportes,
            [event.target.name]: event.target.value,
        })

    };


    useEffect(() => {
        if (reportes.reporte == 1) {
            obtenerTickets();
        }
    }, [reportes.reporte])

    return (
        <div className="site-card-border-less-wrapper">
            <Card
                title="Generación de Reportes"
                bordered={false}
                style={{ width: FullscreenExitOutlined }}>
                <FormControl fullWidth>
                    <InputLabel id="reporte">Seleccionar Reporte</InputLabel>
                    <Select
                        labelId="reporte"
                        id="reporte"
                        label="reporte"
                        value={reportes.reporte}
                        name="reporte"
                        onChange={handleChange}
                        name="reporte"
                    >
                        <MenuItem value={1}>Informe de tickets por usuario</MenuItem>
                        <MenuItem value={2}>Informe de usuarios registrado</MenuItem>
                        <MenuItem value={3}>Informe de Inventario</MenuItem>
                    </Select>
                </FormControl>
                {reportes.reporte == 1 && tickets  ? <ReporteTicketsPorUsuario /> : null}
            </Card>
        </div>
    )
}


export default Reportes;