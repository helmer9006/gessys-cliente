
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';


//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerEstadisticaTicketsAction } from "../../actions/ticketsActions";

const GraficoTicketsDiarios = () => {

  const dispatch = useDispatch();

  //INSTACIAR FUNCION OBTENER ESTADISTICA TICKETS DEL ACTION
  const obtenerEstadisticaTickets = () => dispatch(obtenerEstadisticaTicketsAction());

  //OBTENER ESTADOS DEL STORE
  const estadistica = useSelector((state) => state.tickets.estadisticaTickets);


  useEffect(() => {
    obtenerEstadisticaTickets();
    //#endregion
  }, []);

  let data = estadistica || [];
  // var data = [
  //   {
  //     year: 'Jun 2',
  //     value: 3,
  //   },
  //   {
  //     year: 'Sep 20',
  //     value: 4,
  //   },
  //   {
  //     year: '1993',
  //     value: 3.5,
  //   },
  //   {
  //     year: '1994',
  //     value: 5,
  //   },
  //   {
  //     year: '1995',
  //     value: 4.9,
  //   },
  //   {
  //     year: '1996',
  //     value: 6,
  //   },
  //   {
  //     year: '1997',
  //     value: 7,
  //   },
  //   {
  //     year: '1998',
  //     value: 9,
  //   },
  //   {
  //     year: '1999',
  //     value: 13,
  //   },
  // ];
  var config = {
    data: data,
    xField: 'fecha',
    yField: 'cantidad',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  };
  return <Line {...config} />;
};


export default GraficoTicketsDiarios;