import React, { useState } from "react";
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
} from "antd";


const NuevoTicket = () => {

  
  return (
    <>
      <Card title ="Agregando Nuevo Ticket">
        <Form
  
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          layout="horizontal"
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          // size={componentSize}
        >
          <Form.Item label="Titulo " name=''>
            <Input />
          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
          <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default NuevoTicket;
