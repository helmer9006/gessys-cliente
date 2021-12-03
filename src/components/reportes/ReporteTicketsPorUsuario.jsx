import React, { useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import { Row, Card, Col, message, Alert } from "antd";
import { FullscreenExitOutlined } from '@ant-design/icons';
import ReporteTicketsPorUsuarioPdf from './ReporteTicketsPorUsuarioPdf';
import Pdf from "react-to-pdf";
import Moment from 'moment';
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import Tabla from "./../Tabla";
import MaterialTable from "material-table";
import xlsx from 'xlsx';
import PrintIcon from '@material-ui/icons/Print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

    const { RangePicker } = DatePicker;


    const [busqueda, setBusqueda] = useState({
        fechainicial: "",
        fechafinal: "",
        usuario: "",
        tickets: []
    } || {});

    const { fechainicial, fechafinal, usuario, tickets } = busqueda;

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
        //validaciones 
        if (
            usuario.trim() === "" ||
            fechainicial === "" ||
            fechafinal === "") {
            message.error({
                content: "Todos los campos son obligatorios.",
                className: "custom-class",
                duration: 4,
            });
            return;
        }
        makeRequest()
    }

    const makeRequest = async () => {
        const token = localStorage.getItem("gessys_token");
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get(`/tickets/fecha/${fechainicial}/${fechafinal}/${usuario}`);
            console.log(respuesta.data)
            if (respuesta.data.length > 0) {
                setBusqueda({
                    ...busqueda,
                    tickets: respuesta.data
                })
                // console.log(formatoTickets(respuesta))
            } else {
                message.error({
                    content: "No se encontraron resultados.",
                    className: "custom-class",
                    duration: 4,
                });
            }
        } catch (error) {
            console.log(error)
        }

    }

    // const formatoTickets = (tickets) => {
    //     const res = tickets.map((ticket) => {
    //         return ticket.creacion = Moment(ticket.creacion).format("DD-MM-YYYY hh:mm a");
    //     })
    //     console.log(res)
    // }

    let opcionesUsuarios = [];

    usuarios.forEach((element) => {
        opcionesUsuarios.push(
            <MenuItem key={element._id} value={element._id}>
                {upperCase(element.nombre)}
            </MenuItem>
        );
    });
    // const columns = [
    //     { title: "Codigo", field: "codigo" },
    //     { title: "Estado", field: "estado" },
    //     { title: "Titulo", field: "titulo" },
    //     { title: "Categoria", field: `$categoria.nombre` },
    //     { title: "Tipo", field: "Prioridad" },
    //     { title: "Prioridad", field: "prioridad" },
    //     { title: "Creación", field: "creacion" },
    //     { title: "Actualizacion", field: "actualizacion" },
    // ];

    const columns = [
        { title: "Codigo", field: "codigo" },
        { title: "Estado", field: "estado" },
        { title: "Titulo", field: "titulo" },
        // { title: "Descripcion", field: "descripcion" },
        { title: "Categoria", field: `categoria.nombre` },
        { title: "Tipo", field: "tipo" },
        { title: "Prioridad", field: "prioridad" },
        { title: "Creación", field: "creacion" },
        // { title: "Actualizacion", field: "actualizacion" },
    ];


    const descargarExcel = () => {
        //eliminado campos sobrantes
        const newtickets = tickets.map(item => {
            delete item.mensaje
            delete item.offset
            delete item._id
            delete item.dependencia
            delete item.categoria
            delete item.usuario
            delete item.__v
            delete item.tableData
            return item
        })
        const hoja = xlsx.utils.json_to_sheet(newtickets);
        const libro = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(libro, hoja, "tickets")
        //buffer
        let bef = xlsx.write(libro, { bookType: "xlsx", type: "buffer" })
        //binary string 
        xlsx.write(libro, { bookType: "xlsx", type: "binary" })
        //descargar
        xlsx.writeFile(libro, "reportetickets.xlsx")
    }

    const descargarPdf = () => {

        const columnas = [
            { title: "Codigo", field: "codigo" },
            { title: "Estado", field: "estado" },
            { title: "Titulo", field: "titulo" },
            // { title: "Descripcion", field: "descripcion" },
            { title: "Categoria", field: `categoria.nombre` },
            { title: "Tipo", field: "tipo" },
            { title: "Prioridad", field: "prioridad" },
            { title: "Creación", field: "creacion" },
            // { title: "Actualizacion", field: "actualizacion" },
        ];



        const newtickets = tickets.map(item => {
            delete item.mensaje
            delete item.descripcion
            delete item.offset
            delete item._id
            delete item.dependencia
            delete item.usuario
            delete item.__v
            delete item.tableData
            return item
        })
        const doc = new jsPDF();
        
        doc.text("Reporte de Tickets por Fecha y Usuario", 35, 25)
        doc.autoTable({
            columns: columns.map(col => ({
                ...col,
                dataKey: col.field

            })),
            body: newtickets
        })
        doc.save('reportetickets.pdf');

    }

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

            {tickets.length > 0 ? (
                <MaterialTable
                    title="Reporte de Tickets"
                    data={tickets}
                    columns={columns}
                    disableClick={false}
                    options={{ pageSize: 10, pageSizeOptions: [20, 30, 50] }}
                    localization={{
                        header: {
                            // actions: "Acciones",
                        },
                        pagination: {
                            labelDisplayedRows: "{from}-{to} de {count}",
                            labelRowsSelect: "filas",
                        },
                        toolbar: {
                            searchPlaceholder: "Buscar",
                            nRowsSelected: "{0} fila(s) seleccionada",
                        },
                    }}
                    actions={[
                        {
                            icon: () => <span className="material-icons">
                                cloud_download
                            </span>,
                            tooltip: "Exportar a Excel",
                            onClick: () => descargarExcel(),
                            isFreeAction: true
                        },
                        {
                            icon: () => <PrintIcon />,
                            tooltip: "Exportar a Pdf",
                            onClick: () => descargarPdf(),
                            isFreeAction: true
                        }
                    ]}
                />
            ) : null}
            {/* <ReporteTicketsPorUsuarioPdf /> */}
            {/* {tickets ? (<>

                <ReporteTicketsPorUsuarioPdf  ref={ref}/>

            </>) : "Cargando.."} */}

            {/* <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf> */}
        </Card>
    )
}

export default ReporteTicketsPorUsuario;
