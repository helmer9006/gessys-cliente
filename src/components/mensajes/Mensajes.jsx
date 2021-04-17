import React, { useState, useEffect } from "react";
import { Row, Card, Col, message, Divider, Typography, Space } from "antd";
import Avatar from "../Avatar";
import moment from "moment";

//REDUX
import { useSelector, useDispatch } from "react-redux";

//ACTIONS DE REDUX
import { obtenerMensajesAction } from "../../actions/mensajesActions";

const Mensajes = () => {
  const dispatch = useDispatch();
  const { Text, Link } = Typography;

  //#endregion
  const mensajesStore = useSelector((state) => state.mensajes.mensajes);
  let ticketEditar = useSelector((state) => state.tickets.ticketEditar);

  useEffect(() => {
    //consultar API

    if (!ticketEditar) {
      ticketEditar = JSON.parse(localStorage.getItem("ticketEditado"));
    }
    const cargarMensajes = (_id) => dispatch(obtenerMensajesAction(_id));
    cargarMensajes(ticketEditar._id);
  }, [ticketEditar]);


  //#region ESTRUCTURAR MENSAJES
  const formato = (mensajes) => {
    let datos = [];
    mensajes.map((item) => {
      let objeto = {};
      for (let indice in item) {
        if (indice === "usuario") {
          objeto[indice] = item[indice]._id;
          objeto["nombreUsuario"] = item[indice].nombre;
        } else {
          objeto[indice] = item[indice];
        }
      }
      datos.push(objeto);
    });
    return datos;
  };
  const listaMensajes = formato(mensajesStore);
  // listaMensajes.sort((a, b) => a - b); //ordenando lista
  //#endregion

  return (
    <>
      {listaMensajes.length === 0
        ? null
        : listaMensajes.map((mensaje, idx) => (
            <Card
              style={{
                borderRadius: "7px 7px 7px 7px",
                boxShadow:
                  "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                backgroundColor: "#fff",
                margin: "30px 0px 10px 0px",
              }}
              key={idx}
            >
              <Row justify="start" gutter={8} align="middle">
                <Col>
                  <Avatar name={mensaje.nombreUsuario} size="small" />
                </Col>
                <Col>
                  <Text strong>{mensaje.nombreUsuario}</Text>
                </Col>
                <Col>
                  <Text>{moment(mensaje.creacion).format("DD-MM-YYYY hh:mm a") }</Text>
                </Col>
              </Row>
              <br />
              <Text style={{ width: 90 }} className="salto-linea">
                {mensaje.descripcion}
              </Text>
            </Card>
          ))}
    </>
  );
};

export default Mensajes;
