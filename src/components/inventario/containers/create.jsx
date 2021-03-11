import React, { useEffect, useState } from 'react';
import {
    FormControl,
    InputLabel,
    Button,
    Divider,
    Typography,
    TextField,
    Select,
    MenuItem,
    Card,
    CircularProgress
} from "@material-ui/core";
import { Delete, Save } from "@material-ui/icons";
import { message } from 'antd';
import moment from 'moment';

import axios from '../../../config/axios';
import tokenAuth from '../../../config/tokenAuth';
import CampoNuevo from '../components/campoNuevo';

const Create = ({ history }) => {

    const [state, setState] = useState({
        inventario: {
            codigo: '',
            marca: '',
            modelo: '',
            serial: '',
            responsable: '',
            piso: '',
            dependencia: '',
            categoria: '',
            tipoInventario: '',
            proveedor: '',
            observacion: '',
            estado: '',
            anexo: '',
            fechaFactura: moment().format('YYYY-MM-DD'),
            nuevosCampos: []
        },
        usuarios: [],
        dependencias: [],
        categorias: [],
        tipoInventarios: [],
        proveedores: [],
        campos: [],
        uploading: false,
    });

    const updateState = (newState, setForm = false) => {
        if (setForm) {
            setState((prevState) => ({ ...prevState, inventario: { ...prevState.inventario, ...newState } }));
        } else {
            setState((prevState) => ({ ...prevState, ...newState }));
        }
    }

    useEffect(() => {
        makeRequest();
    }, []);

    const handleChange = (key, value) => updateState({ [key]: value }, true);

    const showError = (msg = null) => {
        message.error({
            content: msg || 'Algo salió mal',
            className: 'custom-class',
            duration: 3,
        });
    }

    const makeRequest = async () => {
        try {
            const token = localStorage.getItem('gessys_token');
            (token) && tokenAuth(token);
            await getCodigo();
            await getUsuarios();
            await getDependencias();
            await getCategorias();
            await getProveedores();
        } catch (e) {
            console.log('[Index] makeRequest error', e);
            showError();
        }
    }

    const getCodigo = async () => {
        try {
            const response = await axios.get('/inventario/ultimo');
            if (response.status === 200) {
                const codigo = response.data?.codigo;
                const split = codigo.split('-');
                let num = parseInt(split[1]) + 1;
                num = num.toString().padStart(4, '0');

                // Coloca el codigo 
                handleChange('codigo', `${split[0]}-${num}`);
            } else {
                console.log('[Index] getCodigo', response);
            }
        } catch (e) {
            showError('No se pudo generar el código');
        }
    }

    const getUsuarios = async () => {
        const response = await axios.get('/usuarios');
        if (response.status === 200) {
            updateState({ usuarios: response.data });
        } else {
            console.log('[Index] getUsuarios', response);
        }
    }

    const getDependencias = async () => {
        const response = await axios.get('/dependencias');
        if (response.status === 200) {
            updateState({ dependencias: response.data });
        } else {
            console.log('[Index] getDependencias', response);
        }
    }

    const getCategorias = async () => {
        const response = await axios.get('/categorias');
        if (response.status === 200) {
            updateState({ categorias: response.data });
        } else {
            console.log('[Index] getCategorias', response);
        }
    }

    const getTipoInventarios = async (id) => {
        const response = await axios.get(`/tipo-inventario/${id}`);
        if (response.status === 200) {
            updateState({ tipoInventarios: response.data });
        } else {
            console.log('[Index] getTipoInventarios', response);
        }
    }

    const getProveedores = async () => {
        const response = await axios.get('/proveedores');
        if (response.status === 200) {
            updateState({ proveedores: response.data });
        } else {
            console.log('[Index] getProveedores', response);
        }
    }

    const getCampos = async (categoria) => {
        try {
            const response = await axios.get(`/nuevos-campos/${categoria}`);
            if (response.status === 200) {
                setState({
                    ...state,
                    campos: response.data,
                    inventario: {
                        ...state.inventario,
                        nuevosCampos: response.data,
                        categoria,
                    }
                });
            } else {
                console.log('[Index] getCodigo', response);
            }
        } catch (e) {
            showError('Error al obtener los nuevos campos');
        }
    }

    const setOptions = (type) => {
        let array = [];
        switch (type) {
            case 'usuario':
                array = state.usuarios;
                break;
            case 'dependencia':
                array = state.dependencias;
                break;
            case 'categoria':
                array = state.categorias;
                break;
            case 'tipoInventario':
                array = state.tipoInventarios;
                break;
            case 'proveedor':
                array = state.proveedores;
                break
        }
        return array.map((item, index) => <MenuItem key={index.toString()} value={item._id}>{item.nombre}</MenuItem>);
    }

    const renderNuevosCampos = () => {
        return state.campos.map((item, index) => {
            return (
                <CampoNuevo
                    key={index.toString()}
                    item={item}
                    onEdit={(e) => handleChangeCampo(e, index)}
                    onDelete={() => removerCampo(index)}
                />
            )
        });
    }

    const handleChangeCampo = (e, i) => {
        state.campos.map((item, index) => {
            if (index === i) {
                let items = state.campos.slice(0);
                items[i] = { ...item, [e.target.name]: e.target.value };
                setState({
                    ...state,
                    campos: items,
                    inventario: {
                        ...state.inventario,
                        nuevosCampos: items,
                    }
                });
            }
        });
    }

    const agregarCampo = () => {
        const items = state.campos.slice(0);
        items.push({ clave: '', valor: '' });
        updateState({ campos: items });
    }

    const removerCampo = async (index) => {
        const items = state.campos.slice(0);
        items.splice(index, 1);
        setState({
            ...state,
            campos: items,
            inventario: {
                ...state.inventario,
                nuevosCampos: items,
            }
        });
    }

    const validarFormulario = async () => {
        await getCodigo();

        let valid = true;
        for (let i in state.inventario) {
            if (state.inventario[i] === '') {
                valid = false;
            }
            if (i === 'nuevosCampos') {
                let items = [];
                state.campos.map((item, index) => {
                    if (item.clave.trim()) {
                        items.push(item);
                    }
                });
                setState({
                    ...state,
                    campos: items,
                    inventario: {
                        ...state.inventario,
                        nuevosCampos: items,
                    }
                });
            }
        }

        if (valid) {
            submit();
        } else {
            showError('Debe llenar todos los campos');
        }
    }

    const submit = async () => {
        try {
            console.log(state);
            const response = await axios.post('/inventario/', state.inventario);
            if (response.status === 200) {
                history.push('/inventario');
            }
        } catch (e) {
            console.log('[Create] submit error', e);
            showError('No se pudo agregar');
        }
    }

    const handleFile = async ({ target }) => {
        updateState({ uploading: true });
        const url = await uploadFile(target.files[0]);
        setState((prev) => ({ ...prev, uploading: false, inventario: { ...prev.inventario, anexo: url } }));
    }

    const uploadFile = async (file) => {
        let fd = new FormData();
        fd.append('archivo', file);

        const response = await axios.post('/archivos', fd);
        return response.data?.archivo?.path;
    }

    return (
        <Card style={{ padding: 15 }}>
            <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                <FormControl style={{ width: '32%' }}>
                    <TextField
                        name="codigo"
                        label="Código"
                        variant="outlined"
                        value={state.inventario.codigo}
                        disabled
                    />
                </FormControl>
                <FormControl variant="outlined" style={{ width: '32%' }}>
                    <InputLabel id="dependencia">Dependencia</InputLabel>
                    <Select
                        labelId="dependencia"
                        name="dependencia"
                        value={state.inventario.dependencia}
                        onChange={({ target: { name, value } }) => {
                            handleChange(name, value);
                            getTipoInventarios(value);
                        }}
                        label="Dependencia"
                    >
                        <MenuItem value="">
                            <em>Seleccionar Dependencia</em>
                        </MenuItem>
                        {setOptions('dependencia')}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ width: '32%' }}>
                    <InputLabel id="tipoInventario">Tipo Inventario</InputLabel>
                    <Select
                        labelId="tipoInventario"
                        name="tipoInventario"
                        value={state.inventario.tipoInventario}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                        label="Tipo Inventario"
                    >
                        <MenuItem value="">
                            <em>Seleccionar Tipo Inventario</em>
                        </MenuItem>
                        {setOptions('tipoInventario')}
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                <FormControl style={{ width: '49%' }}>
                    <TextField
                        name="modelo"
                        label="Modelo"
                        variant="outlined"
                        value={state.inventario.modelo}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                    />
                </FormControl>
                <FormControl style={{ width: '49%' }}>
                    <TextField
                        name="marca"
                        label="Marca"
                        variant="outlined"
                        value={state.inventario.marca}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                    />
                </FormControl>
            </div>
            <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                <FormControl style={{ width: '49%' }}>
                    <TextField
                        name="serial"
                        label="No. serial"
                        variant="outlined"
                        value={state.inventario.serial}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                    />
                </FormControl>
                <FormControl variant="outlined" style={{ width: '49%' }}>
                    <InputLabel id="proveedor">Proveedor</InputLabel>
                    <Select
                        labelId="proveedor"
                        name="proveedor"
                        value={state.inventario.proveedor}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                        label="Proveedor"
                    >
                        <MenuItem value="">
                            <em>Seleccionar Proveedor</em>
                        </MenuItem>
                        {setOptions('proveedor')}
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                <FormControl variant="outlined" style={{ width: '49%' }}>
                    <InputLabel id="responsable">Responsable</InputLabel>
                    <Select
                        labelId="responsable"
                        name="responsable"
                        value={state.inventario.responsable}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                        label="Responsable"
                    >
                        <MenuItem value="">
                            <em>Seleccionar Responsable</em>
                        </MenuItem>
                        {setOptions('usuario')}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ width: '49%' }}>
                    <InputLabel id="categoria">Categoria</InputLabel>
                    <Select
                        labelId="categoria"
                        name="categoria"
                        value={state.inventario.categoria}
                        onChange={({ target: { name, value } }) => getCampos(value)}
                        label="Categoria"
                    >
                        <MenuItem value="">
                            <em>Seleccionar Categoria</em>
                        </MenuItem>
                        {setOptions('categoria')}
                    </Select>
                </FormControl>
            </div>

            <div style={{ display: 'flex', paddingBottom: 15 }}>
                <FormControl style={{ width: '100%' }}>
                    <TextField
                        name="observacion"
                        label="Observación"
                        variant="outlined"
                        value={state.inventario.observacion}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                    />
                </FormControl>
            </div>
            <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                <FormControl style={{ width: '49%' }}>
                    <TextField
                        name="piso"
                        label="Piso"
                        variant="outlined"
                        value={state.inventario.piso}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                    />
                </FormControl>
                <FormControl variant="outlined" style={{ width: '49%' }}>
                    <InputLabel id="estado">Estado</InputLabel>
                    <Select
                        labelId="estado"
                        name="estado"
                        value={state.inventario.estado}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                        label="Estado"
                    >
                        <MenuItem value=""><em>Seleccionar estado</em></MenuItem>
                        <MenuItem value="asignado">asignado</MenuItem>
                        <MenuItem value="por asignar">por asignar</MenuItem>
                        <MenuItem value="garantia">garantia</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                <FormControl variant="outlined" style={{ width: '49%' }}>
                    <TextField
                        name='fechaFactura'
                        label="fechaFactura"
                        type="date"
                        defaultValue={state.inventario.fechaFactura}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={({ target: { name, value } }) => handleChange(name, value)}
                    />
                </FormControl>
                <div style={{ display: 'flex', flexDirection: 'row', width: '49%', alignItems: 'center' }}>
                    <Button
                        variant='contained'
                        component='label'
                        style={{ width: '40%' }}
                    >Upload File
                    <input type='file' style={{ display: 'none' }} onChange={handleFile} />
                    </Button>
                    {
                        !state.uploading ?
                            (
                                state.inventario.anexo &&
                                <Typography style={{ marginTop: 10 }}>{'Archivo subido'}</Typography>
                            )
                            :
                            <CircularProgress size={20} />
                    }
                </div>
            </div>
            <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                <span>Campos nuevos</span>
                <Divider />
            </div>
            {
                renderNuevosCampos()
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary" onClick={agregarCampo}>Agregar nuevo campo</Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    size="large"
                    type="submit"
                    onClick={validarFormulario}
                >Guardar</Button>
            </div>
        </Card>
    );
}

export default Create;