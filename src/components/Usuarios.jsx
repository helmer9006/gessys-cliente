import React, { useState, useEffect } from "react";
import { Card, Input, message } from "antd";
import useForm from "../hook/useForm";

//,MATERIAL UI

import {
  FormControl,
  InputLabel,
  Button,
  TextareaAutosize,
  TextField,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//ACTIONS DE REDUX
import { FullscreenExitOutlined, AudioOutlined } from "@ant-design/icons";

const Usuarios = () => {
  const initialState = {
    nombre: "",
    password: "",
    email: "",
    dependencia: "",
  };
  const formulario = useForm({ initialState });
  console.log(formulario.fields);

  const enviar = (e) => {
    e.preventDefault();
    if (!formulario.ValidateForm()) {
      message.error({
        content: "Ambos campos son obligatorios",
        className: "custom-class",
        duration: 3,
        style: {
          // marginTop: '20vh',
        },
      });
    }
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Usuarios"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      >
        <FormControl className="anchoCompleto">
          <TextField
            label="nombre"
            variant="outlined"
            {...formulario.getInput("nombre")}
          />
        </FormControl>
        <TextField
          // name="password"
          // value={password}
          // id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          {...formulario.getInput("password")}
        />

        <Button
          variant="contained"
          color="primary"
          // className={}
          startIcon={<SaveIcon />}
          size="large"
          type="submit"
          onClick={enviar}
        >
          Guardar Usuario
        </Button>
      </Card>
    </div>
  );
};

export default Usuarios;
