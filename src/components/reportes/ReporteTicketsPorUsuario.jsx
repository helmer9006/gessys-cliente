import React, { useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import { Row, Card, Col, message } from "antd";
import { FullscreenExitOutlined } from '@ant-design/icons';
import ReporteTicketsPorUsuarioPdf from './ReporteTicketsPorUsuarioPdf';
import Pdf from "react-to-pdf";
//#region IMPORTANDO COMPONENTE DE MATERIAL-UI
import {
    FormControl,
    InputLabel,
    Button,
    TextField,
    Select,
    MenuItem,
} from "@material-ui/core";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { obtenerUsuariosAction } from "../../actions/usuariosActions";
import { upperCase } from 'lodash';


const ref = React.createRef();

const ReporteTicketsPorUsuario = () => {

    const dispatch = useDispatch();
    //EJECUTANDO FUNCIONES DEL ACTION
    const obtenerUsuarios = () => dispatch(obtenerUsuariosAction());

    //CONSUTLANDO STATE GLOBAL 
    const cargando = useSelector((state) => state.tickets.loading);
    const usuarios = useSelector((state) => state.usuarios.usuarios);
    const tickets = useSelector((state) => state.tickets.tickets);

    const { RangePicker } = DatePicker;


    const [busqueda, setBusqueda] = useState({
        fechainicial: "",
        fechafinal: "",
        usuario: ""
    } || {});

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const handleChangeDate = (e) => {
        setBusqueda({
            ...busqueda,
            fechainicial: e[0]._d,
            fechafinal: e[1]._d
        })
    }

    const handleChange = (e) => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        console.log(busqueda)
    }


    let opcionesUsuarios = [];

    usuarios.forEach((element) => {
        opcionesUsuarios.push(
            <MenuItem key={element._id} value={element._id}>
                {upperCase(element.nombre)}
            </MenuItem>
        );
    });

    return (
        <Card
            bordered={false}
            style={{ width: FullscreenExitOutlined }}>

            <div className="flex-grid">
                <div><Space direction="vertical" size={12}>
                    <RangePicker
                        onChange={handleChangeDate}
                        allowClear={false}
                    />

                </Space></div>
                <div > <FormControl variant="outlined" gutter={[8, 8]} style={{ width: "288px" }}>
                    <InputLabel id="usuario">Usuario</InputLabel>
                    <Select
                        labelId="usuario"
                        name="usuario"
                        id="usuario"
                        value={busqueda.usuario}
                        onChange={handleChange}
                        label="Usuario"
                    >
                        <MenuItem value="">
                            <em>Seleccionar Usuario</em>
                        </MenuItem>
                        {opcionesUsuarios}
                    </Select>
                </FormControl></div>
                <div> <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    type="submit"
                    onClick={onSubmit}
                >
                    Generar Reporte
                </Button></div>
                <div>


                </div>
            </div>
            {tickets ? (<>

                <ReporteTicketsPorUsuarioPdf  ref={ref}/>

            </>) : "Cargando.."}

            <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>
        </Card>
    )
}

export default ReporteTicketsPorUsuario;
