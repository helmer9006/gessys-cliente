import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";

const GraficoInventario = () => {
  // STATE LOCAL
  const [countTickets, setCountTickets] = useState({
    airesAcondicionados: 20,
    computadores: 10,
    telefonos: 40,
    impresoras: 30,
    camas: 30,
    ventiladores: 30,
  });

  var data = [
    {
      categoria: "Aires Acondicionados",
      cantidad: countTickets.airesAcondicionados,
    },
    {
      categoria: "Computadores",
      cantidad: countTickets.computadores,
    },
    {
      categoria: "Teléfonos",
      cantidad: countTickets.telefonos,
    },
    {
      categoria: "Impresoras",
      cantidad: countTickets.impresoras,
    },
    {
      categoria: "Camas",
      cantidad: countTickets.camas,
    },
    {
      categoria: "Ventiladores UCI",
      cantidad: countTickets.ventiladores,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: "cantidad",
    colorField: "categoria",
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: function formatter(v) {
          return "".concat(v, " \xA5");
        },
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: { textAlign: "center" },
      autoRotate: false,
      content: "{value}",
    },
    interactions: [
      { type: "element-selected" },
      { type: "element-active" },
      { type: "pie-statistic-active" },
    ],
  };
  return <Pie {...config} />;
};

export default GraficoInventario;
