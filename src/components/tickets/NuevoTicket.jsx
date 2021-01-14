import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Card,
  Row,
  Col,
} from "antd";

const { TextArea } = Input;

const NuevoTicket = () => {
  const [ticket, setTicket] = useState({
    //codigo - hacer consulta al api, traer el ultio y aumentar codigo
    titulo: "",
    descripcion: "",
    tipo: "",
    dependencia: "",
    categoria: "",
    prioridad: "",
  });

  const {
    titulo,
    descripcion,
    tipo,
    dependencia,
    categoria,
    prioridad,
  } = ticket;

  const OnChance = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const OnChanceSelect = (value) => {
    setTicket({
      tipo: value,
      dependencia: value,
      categoria: value,
      prioridad: value,
    });
    // setTicket({ dependencia: value });
    // setTicket({ categoria: value });
    // setTicket({ prioridad: value });
    // setTicket({ dependencia: value });
  };

  return (
    <>
      <Card title="Agregando Nuevo Ticket">
        <Form
          // labelCol={{ span: 18 }}
          //wrapperCol={{ span: 18 }}
          layout="horizontal"
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          //size={componentSize}
        >
          <Row gutter={[8, 8]}>
            <Col span={18} push={6}>
              <Form.Item>
                <Input placeholder="Titulo" name="titulo" onChange={OnChance} />
              </Form.Item>
              <Form.Item>
                <TextArea
                  placeholder="Descripción"
                  autoSize={{ minRows: 16, maxRows: 16 }}
                  name="descripcion"
                  onChange={OnChance}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Guardar</Button>
              </Form.Item>
            </Col>
            <Col span={6} pull={18}>
              <Form.Item>
                <Select
                  placeholder="Seleccionar Dependencia"
                  name={dependencia}
                  onChange={OnChanceSelect}
                >
                  <Select.Option value="5fbada592d929d215c89b2b8">
                    SISTEMAS
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Select
                  placeholder="Seleccionar Categoría"
                  name="categoria"
                  onChange={OnChanceSelect}
                >
                  <Select.Option value="5fc10c5bfe1c973840c10f76">
                    MEDICAMENTOS
                  </Select.Option>
                  <Select.Option value="5ffcfb317f6d7d5bc810d5ee">
                    HISTORIA CLINICA
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Select
                  name="tipo"
                  onChange={OnChanceSelect}
                  placeholder="Seleccionar Tipo"
                >
                  <Select.Option value="soporte">Soporte</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Select
                  name="prioridad"
                  onChange={OnChanceSelect}
                  placeholder="Seleccionar Prioridad"
                >
                  <Select.Option value="baja">Baja</Select.Option>
                  <Select.Option value="media">Media</Select.Option>
                  <Select.Option value="alta">Alta</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default NuevoTicket;
