import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//ACTIONS DE REDUX
import { obtenerTicketsAction } from "../actions/ticketsActions";



let filtro = null;
const useTickets = ({ IndexEstado, opcion }) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  console.log(IndexEstado);
  useEffect(() => {
    //consultar API
    const cargarTickets = () => dispatch(obtenerTicketsAction());
    cargarTickets();
  }, []);


  const [estado, setEstado] = useState(null);
  const [result, setResult] = useState(null);
  const usuario = useSelector((state) => state.auth.usuario);
  const { id, dependencia } = usuario;
  // if (IndexEstado === 0) {
  //   setEstado("nuevo");
  // } else if (IndexEstado === 1) {
  //   setEstado("proceso");
  // } else if (IndexEstado === 2) {
  //   setEstado("resuelto");
  // } else {
  //   setEstado("cancelado");
  // }

  switch (opcion) {
    case 0: //TICKETS
      setResult(
        tickets.filter(
          (item) =>
            item.estado === `${estado}` &&
            item.dependencia._id === `${dependencia}`
        )
      );
      console.log(result);
      break;
    case 1: //MIS TICKETS
      setResult(
        tickets.filter(
          (item) => item.estado === `${estado}` && item.usuario._id === `${id}`
        )
      );
      break;
    default:
      break;
  }
  return {result};
};
export default useTickets;

// si opcion es mis tickets debe retornas tickets donde usaurio
//es el id del usuario logueado retornas
//si es tickets debe  retornar tickets donde depdendncia sea
//la dependencia del usuario logueado
