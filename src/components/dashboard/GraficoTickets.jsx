import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";

const GraficoInventario = ({ datos }) => {
  const {
    cantDependencias,
    cantInventarios,
    cantTickets,
    cantUsuarios,
    ticketsCancelados,
    ticketsNuevos,
    ticketsProceso,
    ticketsResueltos,
  } = datos;

  // STATE LOCAL

  var data =
    [
      {
        estado: "Nuevo",
        cantidad: ticketsNuevos,
      },
      {
        estado: "Resueltos",
        cantidad: ticketsResueltos,
      },

      {
        estado: "Cancelados",
        cantidad: ticketsCancelados,
      },
      {
        estado: "Proceso",
        cantidad: ticketsProceso,
      },
    ] || [];

  var config = {
    appendPadding: 10,
    data: data || [],
    angleField: "cantidad",
    colorField: "estado",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref) {
        var percent = _ref.percent;
        return "".concat(Math.round(percent * 100), "%");
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...config} />;
};

export default GraficoInventario;
