import React, { useState } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { useSelector, useDispath } from "react-redux";
import moment from "moment";
import 'moment/locale/es';

// Redux
import { useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { guardarUsuarioEditarAction } from "../../actions/usuariosActions";

//MATERIAL UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const TablaUsuarios = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // habilitar history para redirección
  const classes = useStyles();
  //CONSULTANDO ESTADO GLOBAL
  const cargando = useSelector((state) => state.usuarios.loading);
  const usuarios = useSelector((state) => state.usuarios.usuarios);

  // //prueba fecha
  // usuarios.forEach((element) => {
  //   var m = moment(element.creacion).format('DD-MM-YYYY hh:mm:ss a');
  //   console.log(m);
  //   // console.log(m.utc().add("hours", -5).format("HH:mm:ss")); // 22:23:41
  // });

  //*******************************************************/
  const [selectedRow, setSelectedRow] = useState(null);

  //**************************************************/
  //   función que redirige de forma programada a editar
  const redireccionarEdicion = (usuario) => {
    dispatch(guardarUsuarioEditarAction(usuario));
    history.push(`/usuarios/editar/${usuario._id}`);
  };
  //DESCENSTRUCTURAR

  const {
    nombre,
    password,
    email,
    dependencia,
    estado,
    _id,
    perfil,
    creacion,
    tipoIdentificacion,
    identificacion,
    foto,
  } = usuarios;

  const columns = [
    { title: "Nombre", field: "nombre" },
    { title: "Correo", field: "email" },
    { title: "Perfil", field: "perfil" },
    { title: "Estado", field: "estado" },
    { title: "Creacion", field: "creacion" },
  ];

  return (
    <>
      {cargando ? (
        <div className={classes.cargando}>
          <CircularProgress />
        </div>
      ) : (
        <MaterialTable
          columns={columns}
          data={usuarios||[]}
          title=""
          //actions={[
          // {
          //icon: "edit",
          //tooltip: "Editar Ticket",
          // onClick: (event, rowData) =>  alert("Vas a editar " + rowData),
          //},
          // {
          //   icon: "delete",
          //   tooltip: "Eliminar Ticket",
          //   onClick: (event, rowData) =>
          //     alert("has seleccionado editar " + rowData.titulo),
          // },
          //]}
          onRowClick={(evt, selectedRow) => {
            setSelectedRow(selectedRow.tableData.id);
            redireccionarEdicion(selectedRow);
          }}
          options={{ pageSize: 15 }}
          // options={{
          //   actionsColumnIndex: -1,
          //   selection: true, //para activar los input de selección
          //   rowStyle: (rowData) => ({
          //     backgroundColor:
          //       selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          //   }),
          // }}
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
          //onSelectionChange={(event, rowdata) => alert('You selected ' + rowdata._id)}
          // onSelectionChange={(rows) => alert('has seleccionado editar ' + rowData.titulo)}
        />
      )}
    </>
  );
};

export default TablaUsuarios;
