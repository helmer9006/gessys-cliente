import React, { useState } from "react";
import MaterialTable from "material-table";


const TablaTickets = ({tickets, data, columns}) => {

    
 //*******************************************************/
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <MaterialTable
      columns={columns}
      data={tickets}
      title=""
      actions={[
        {
          icon: "edit",
          tooltip: "Editar Ticket",
          onClick: (event, rowData) => alert("Vas a editar " + rowData._id),
        },
        // {
        //   icon: "delete",
        //   tooltip: "Eliminar Ticket",
        //   onClick: (event, rowData) =>
        //     alert("has seleccionado editar " + rowData.titulo),
        // },
      ]}
      onRowClick={(evt, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
        //history.push('/tickets/editar');
        alert(setSelectedRow(selectedRow.tableData.id));
      }}
      options={{
        actionsColumnIndex: -1,
        // selection: true, //para activar los input de selección
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
        }),
      }}
      localization={{
        header: {
          actions: "Acciones",
        },
      }}
      //onSelectionChange={(event, rowdata) => alert('You selected ' + rowdata._id)}
      // onSelectionChange={(rows) => alert('has seleccionado editar ' + rowData.titulo)}
    />
  );
};

export default TablaTickets;
