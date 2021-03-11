import React, { useEffect, useState } from 'react';
import {
    FormControl,
    InputLabel,
    Button,
    TextField,
    Select,
    MenuItem,
    Card,
    CircularProgress,
    Typography
} from '@material-ui/core';
import { Cancel, Edit as EditIcon } from '@material-ui/icons';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';

import axios from '../../../config/axios';
import tokenAuth from '../../../config/tokenAuth';
import CampoNuevo from '../components/campoNuevo';

const Edit = ({ inventario }) => {

    const history = useHistory();

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
            //anexo: '',
            fechaFactura: '2021-02-21',
            nuevosCampos: []
        },
        usuarios: [],
        dependencias: [],
        categorias: [],
        tipoInventarios: [],
        proveedores: [],
        campos: [],
        auth: {},
        loading: true,
        edit: false,
    });

    const updateState = (newState, setForm = false) => {
        if (setForm) {
            setState((prevState) => ({ ...prevState, inventario: { ...prevState.inventario, ...newState } }));
        } else {
            setState((prevState) => ({ ...prevState, ...newState }));
        }
    }

    useEffect(() => {
        if (inventario._id) {
            makeRequest();
        }
    }, [inventario._id]);

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
            await getTipoInventarios(inventario.dependencia);
            await getUsuarios();
            await getDependencias();
            await getCategorias();
            await getProveedores();
            await getUsuario();
            updateState({ inventario, campos: inventario.nuevosCampos, loading: false }) ////////////////////////////////////////////////////////////////////////////////////
        } catch (e) {
            console.log('[Edit] makeRequest error', e);
            showError();
        }
    }

    const getUsuario = async () => {
        const response = await axios.get('/auth');
        if (response.status === 200) {
            console.log('usuario', response.data);
            updateState({ auth: response.data.usuario });
        } else {
            console.log('[Edit] getUsuarios', response);
        }
    }

    const getUsuarios = async () => {
        const response = await axios.get('/usuarios');
        if (response.status === 200) {
            console.log('usuarios', response.data);
            updateState({ usuarios: response.data });
        } else {
            console.log('[Edit] getUsuarios', response);
        }
    }

    const getDependencias = async () => {
        const response = await axios.get('/dependencias');
        if (response.status === 200) {
            console.log('dependencias', response.data);
            updateState({ dependencias: response.data });
        } else {
            console.log('[Edit] getDependencias', response);
        }
    }

    const getCategorias = async () => {
        const response = await axios.get('/categorias');
        if (response.status === 200) {
            console.log('categorias', response.data);
            updateState({ categorias: response.data });
        } else {
            console.log('[Edit] getCategorias', response);
        }
    }

    const getTipoInventarios = async (id) => {
        const response = await axios.get(`/tipo-inventario/${id}`);
        if (response.status === 200) {
            console.log('tipo inventarios', response.data);
            updateState({ tipoInventarios: response.data });
        } else {
            console.log('[Edit] getTipoInventarios', response);
        }
    }

    const getProveedores = async () => {
        const response = await axios.get('/proveedores');
        if (response.status === 200) {
            console.log('proveedores', response.data);
            updateState({ proveedores: response.data });
        } else {
            console.log('[Edit] getProveedores', response);
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
                console.log('[Edit] getCampos', response);
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
                    disabled={!state.edit}
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
        let valid = true;
        for (let i in state.inventario) {
            if (state.inventario[i] === '') {
                ////////////////////////
                valid = (i === 'anexo');
                ////////////////////////
            }
            if (i === 'nuevosCampos') {
                let items = [];
                state.campos.map((item) => {
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
            const response = await axios.put('/inventario', state.inventario);
            if (response.status === 200) {
                history.push('/inventario');
            }
        } catch (e) {
            console.log('[Create] submit error', e);
            showError('No se pudo agregar');
        }
    }

    const condicion = !(state.auth.perfil === 'administrador' && state.edit);

    return (
        !state.loading ?
            <Card style={{ padding: 15, marginTop: 15 }}>
                <Typography variant="h5" component="h2" style={{ paddingBottom: 15 }}>Editar</Typography>
                <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                    <FormControl style={{ width: '32%' }}>
                        <TextField
                            name='codigo'
                            label='Código'
                            variant='outlined'
                            value={state.inventario.codigo}
                            disabled
                        />
                    </FormControl>
                    <FormControl variant='outlined' style={{ width: '32%' }}>
                        <InputLabel id='dependencia'>Dependencia</InputLabel>
                        <Select
                            labelId='dependencia'
                            name='dependencia'
                            value={state.inventario.dependencia}
                            onChange={({ target: { name, value } }) => {
                                handleChange(name, value);
                                getTipoInventarios(value);
                            }}
                            label='Dependencia'
                            disabled={condicion}
                        >
                            <MenuItem value=''>
                                <em>Seleccionar Dependencia</em>
                            </MenuItem>
                            {setOptions('dependencia')}
                        </Select>
                    </FormControl>
                    <FormControl variant='outlined' style={{ width: '32%' }}>
                        <InputLabel id='tipoInventario'>Tipo Inventario</InputLabel>
                        <Select
                            labelId='tipoInventario'
                            name='tipoInventario'
                            value={state.inventario.tipoInventario}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            label='Tipo Inventario'
                            disabled={condicion}
                        >
                            <MenuItem value=''>
                                <em>Seleccionar Tipo Inventario</em>
                            </MenuItem>
                            {setOptions('tipoInventario')}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            name='modelo'
                            label='Modelo'
                            variant='outlined'
                            value={state.inventario.modelo}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            disabled={condicion}
                        />
                    </FormControl>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            name='marca'
                            label='Marca'
                            variant='outlined'
                            value={state.inventario.marca}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            disabled={condicion}
                        />
                    </FormControl>
                </div>
                <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            name='serial'
                            label='No. serial'
                            variant='outlined'
                            value={state.inventario.serial}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            disabled={condicion}
                        />
                    </FormControl>
                    <FormControl variant='outlined' style={{ width: '49%' }}>
                        <InputLabel id='proveedor'>Proveedor</InputLabel>
                        <Select
                            labelId='proveedor'
                            name='proveedor'
                            value={state.inventario.proveedor}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            label='Proveedor'
                            disabled={condicion}
                        >
                            <MenuItem value=''>
                                <em>Seleccionar Proveedor</em>
                            </MenuItem>
                            {setOptions('proveedor')}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                    <FormControl variant='outlined' style={{ width: '49%' }}>
                        <InputLabel id='responsable'>Responsable</InputLabel>
                        <Select
                            labelId='responsable'
                            name='responsable'
                            value={state.inventario.responsable}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            label='Responsable'
                            disabled={!state.edit}
                        >
                            <MenuItem value=''>
                                <em>Seleccionar Responsable</em>
                            </MenuItem>
                            {setOptions('usuario')}
                        </Select>
                    </FormControl>
                    <FormControl variant='outlined' style={{ width: '49%' }}>
                        <InputLabel id='categoria'>Categoria</InputLabel>
                        <Select
                            labelId='categoria'
                            name='categoria'
                            value={state.inventario.categoria}
                            onChange={({ target: { name, value } }) => getCampos(value)}
                            label='Categoria'
                            disabled={condicion}
                        >
                            <MenuItem value=''>
                                <em>Seleccionar Categoria</em>
                            </MenuItem>
                            {setOptions('categoria')}
                        </Select>
                    </FormControl>
                </div>

                <div style={{ display: 'flex', paddingBottom: 15 }}>
                    <FormControl style={{ width: '100%' }}>
                        <TextField
                            name='observacion'
                            label='Observación'
                            variant='outlined'
                            value={state.inventario.observacion}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            disabled={!state.edit}
                        />
                    </FormControl>
                </div>
                <div style={{ display: 'flex', paddingBottom: 15, justifyContent: 'space-between' }}>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            name='piso'
                            label='Piso'
                            variant='outlined'
                            value={state.inventario.piso}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            disabled={!state.edit}
                        />
                    </FormControl>
                    <FormControl variant='outlined' style={{ width: '49%' }}>
                        <InputLabel id='estado'>Estado</InputLabel>
                        <Select
                            labelId='estado'
                            name='estado'
                            value={state.inventario.estado}
                            onChange={({ target: { name, value } }) => handleChange(name, value)}
                            label='Estado'
                            disabled={!state.edit}
                        >
                            <MenuItem value=''><em>Seleccionar estado</em></MenuItem>
                            <MenuItem value='asignado'>asignado</MenuItem>
                            <MenuItem value='por asignar'>por asignar</MenuItem>
                            <MenuItem value='garantia'>garantia</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Typography variant='h5' component='h2'>Campos nuevos</Typography>
                {
                    renderNuevosCampos()
                }
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {
                        !state.edit ?
                            <Button
                                variant='contained'
                                color='primary'
                                size='large'
                                type='submit'
                                onClick={() => updateState({ edit: true })}
                            >Editar</Button>
                            :
                            <>
                                <Button variant='outlined' color='primary' onClick={agregarCampo}>Agregar nuevo campo</Button>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        startIcon={<EditIcon />}
                                        size='large'
                                        type='submit'
                                        onClick={validarFormulario}
                                    >Actualizar</Button>
                                    <Button startIcon={<Cancel />} onClick={() => updateState({ edit: false })} />
                                </div>
                            </>
                    }
                </div>
            </Card>
            :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
    );
}

export default Edit;