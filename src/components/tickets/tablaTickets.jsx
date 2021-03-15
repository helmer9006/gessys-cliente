import React, { useState } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { esES } from "@material-ui/core/locale";

// Redux
import { useDispatch } from "react-redux";
import { obtenerTicketEditarAction } from "../../actions/ticketsActions";

const TablaTickets = ({ tickets, data, columns }) => {
  const dispatch = useDispatch();
  const history = useHistory(); // habilitar history para redirección

  //*******************************************************/
  const [selectedRow, setSelectedRow] = useState(null);

  //**************************************************/
  // función que redirige de forma programada
  const redireccionarEdicion = (ticket) => {
    dispatch(obtenerTicketEditarAction(ticket));
    history.push(`/tickets/editar/${ticket._id}`);
  };

  return (
    <MaterialTable
      columns={columns}
      data={tickets}
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
        // setSelectedRow(selectedRow.tableData.id);
        redireccionarEdicion(selectedRow);
      }}
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
  );
};

export default TablaTickets;
