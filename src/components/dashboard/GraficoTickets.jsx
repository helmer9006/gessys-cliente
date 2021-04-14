import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";

const GraficoInventario = () => {
  // STATE LOCAL
  const [countTickets, setCountTickets] = useState({
    nuevos: 20,
    finalizados: 10,
    proceso: 40,
    cancelados: 30,
  });

  var data = [
    {
      estado: "Nuevo",
      cantidad: countTickets.nuevos,
    },
    {
      estado: "Finalizados",
      cantidad: countTickets.finalizados,
    },
    {
      estado: "Proceso",
      cantidad: countTickets.proceso,
    },
    {
      estado: "Cancelados",
      cantidad: countTickets.cancelados,
    },
  ];

  
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
        return "".concat(percent * 100, "%");
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
