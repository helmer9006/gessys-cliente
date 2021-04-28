import React, { useEffect, useState } from 'react';
import {
    FormControl,
    Button,
    TextField,
    Backdrop,
    Modal,
    CircularProgress,
    Typography,
    Card,
    CardContent,
    CardActions
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { message } from 'antd';

import axios from '../../../config/axios';
import tokenAuth from '../../../config/tokenAuth';
import HistorialComponent from '../components/historial';
import { fileToBase64Record } from '../components/convertFile';

const Historial = ({ inventario }) => {

    const [state, setState] = useState({
        inventario: inventario,
        loading: true,
        historial: [],
        form: {
            observacion: '',
            inventario: '',
            anexo: {
                titulo: '',
                url: '',
            }
        },
        formEdit: {
            observacion: '',
            inventario: '',
            anexo: {
                titulo: '',
                url: '',
            }
        },
        uploading: false,
        visibleModalCreate: false,
        visibleModalEdit: false,
    });

    const updateState = (newState, setForm = false) => {
        if (setForm) {
            setState((prevState) => ({ ...prevState, form: { ...prevState.form, ...newState } }));
        } else {
            setState((prevState) => ({ ...prevState, ...newState }));
        }
    }

    useEffect(() => {
        updateState({ loading: true });
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
            await getHistorial();
            setState((prevState) => ({ ...prevState, loading: false, form: { ...prevState.form, inventario: inventario._id } }));
        } catch (e) {
            console.log('[Historial] makeRequest error', e);
            showError();
        }
    }

    const getHistorial = async () => {
        const response = await axios.get(`/historial-inventario/${inventario._id}`);
        if (response.status === 200) {
            console.log('historial', response.data);
            updateState({ historial: response.data });
        } else {
            console.log('[Historial] getHistorial', response);
        }
    }

    const validarFormulario = async () => {
        console.log(state.form);
        let valid = true;
        for (let i in state.form) {
            if (state.form[i] === '') {
                valid = false;
            }
        }

        if (valid) {
            store();
        } else {
            showError('Debe llenar todos los campos');
        }
    }

    const store = async () => {
        try {
            const response = await axios.post('/historial-inventario', state.form);
            if (response.status === 200) {
                getHistorial();
                closeModal();
            }
        } catch (e) {
            console.log('[Historial] submit error', e);
            showError('No se pudo agregar');
        }
    }

    const validarFormularioEdit = async () => {
        console.log(state.formEdit);
        let valid = true;
        for (let i in state.formEdit) {
            if (state.formEdit[i] === '') {
                valid = false;
            }
        }

        if (valid) {
            update();
        } else {
            showError('Debe llenar todos los campos');
        }
    }

    const update = async () => {
        try {
            const response = await axios.put('/historial-inventario', state.formEdit);
            if (response.status === 200) {
                getHistorial();
                closeModal();
            }
        } catch (e) {
            console.log('[Historial] submit error', e);
            showError('No se pudo editar');
        }
    }

    const renderHistorial = () => {
        return state.historial.map((item, key) => {
            return <HistorialComponent
                key={key}
                item={item}
                showFile={() => window.open(item.anexo[0].url, '_blank')}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item)}
            />
        });
    }

    const handleChangeAnexo = (key, value) => {
        setState((prev) => ({ ...prev, form: { ...prev.form, anexo: { ...prev.form.anexo, [key]: value } } }));
    }

    const handleFile = async ({ target }) => {
        updateState({ uploading: true });
        fileToBase64Record(target.files[0], setState);
    }

    const closeModal = () => {
        setState((prev) => ({
            ...prev,
            visibleModalCreate: false,
            visibleModalEdit: false,
            form: {
                ...prev.form,
                observacion: '',
                anexo: {
                    titulo: '',
                    url: '',
                }
            },
            formEdit: {
                ...prev.formEdit,
                observacion: '',
                anexo: {
                    titulo: '',
                    url: '',
                }
            }
        }));
    }

    const onEdit = (item) => {
        setState((prev) => ({
            ...prev,
            visibleModalEdit: true,
            formEdit: {
                _id: item._id,
                observacion: item.observacion,
                anexo: {
                    titulo: item.anexo[0].titulo,
                    url: item.anexo[0].url,
                }
            }
        }));
    }

    const onDelete = async (item) => {
        try {
            const canDelete = window.confirm('¿Seguro desea eliminar este registro?');
            if (canDelete) {
                const response = await axios.delete(`/historial-inventario/${item._id}`);
                if (response.status === 200) {
                    getHistorial();
                    closeModal();
                }
            }
        } catch (e) {
            console.log('[Historial] submit error', e);
            showError('No se pudo editar');
        }
    }

    return (
        !state.loading ?
            <Card style={{ padding: 15, marginTop: 15 }}>
                <Typography variant='h5' component='h2' style={{ paddingBottom: 15 }}>Historial</Typography>
                <div>
                    {
                        renderHistorial()
                    }
                </div>
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<Add />}
                    size='large'
                    type='submit'
                    onClick={() => updateState({ visibleModalCreate: true })}
                >Agregar</Button>
                <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={state.visibleModalCreate}
                    onClose={() => updateState({ visibleModalCreate: false })}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Card style={{ width: '80%', backgroundColor: '#fff' }}>
                        <CardContent>
                            <Typography variant='h5' component='h2' style={{ paddingBottom: 15 }}>Historial</Typography>
                            <FormControl style={{ width: '100%' }}>
                                <TextField
                                    name='observacion'
                                    label='Observacion'
                                    variant='outlined'
                                    value={state.form.observacion}
                                    onChange={({ target: { name, value } }) => handleChange(name, value)}
                                />
                            </FormControl>
                            {
                                !state.uploading ?
                                    (
                                        state.form.anexo.url &&
                                        <Typography style={{ marginTop: 10 }}>{'Archivo subido'}</Typography>
                                    )
                                    :
                                    <CircularProgress size={20} />
                            }

                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Button
                                    variant='contained'
                                    component='label'
                                    style={{ width: '20%', marginTop: 10 }}
                                >Upload File<input type='file' style={{ display: 'none' }} onChange={handleFile} />
                                </Button>
                                <FormControl style={{ width: '80%', marginTop: 10 }}>
                                    <TextField
                                        name='titulo'
                                        label='Titulo'
                                        variant='outlined'
                                        value={state.form.anexo.titulo}
                                        onChange={({ target: { name, value } }) => handleChangeAnexo(name, value)}
                                    />
                                </FormControl>
                            </div>
                        </CardContent>

                        <CardActions >
                            <Button size='small' color='default' onClick={closeModal}>Cancelar</Button>
                            <Button size='small' color='primary' onClick={validarFormulario}>Guardar</Button>
                        </CardActions>
                    </Card>
                </Modal>

                <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={state.visibleModalEdit}
                    onClose={closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Card style={{ width: '80%', backgroundColor: '#fff' }}>
                        <CardContent>
                            <Typography variant='h5' component='h2' style={{ paddingBottom: 15 }}>Editar Historial</Typography>
                            <FormControl style={{ width: '100%' }}>
                                <TextField
                                    name='observacion'
                                    label='Observacion'
                                    variant='outlined'
                                    value={state.formEdit.observacion}
                                    onChange={({ target: { name, value } }) => setState((prev) => ({ ...prev, formEdit: { ...prev.formEdit, [name]: value } }))}
                                />
                            </FormControl>
                            <FormControl style={{ width: '100%', marginTop: 10 }}>
                                <TextField
                                    name='titulo'
                                    label='Titulo'
                                    variant='outlined'
                                    value={state.formEdit.anexo.titulo}
                                    onChange={({ target: { name, value } }) => setState((prev) => ({ ...prev, formEdit: { ...prev.formEdit, anexo: { ...prev.formEdit.anexo, [name]: value } } }))}
                                />
                            </FormControl>

                        </CardContent>

                        <CardActions >
                            <Button size='small' color='default' onClick={closeModal}>Cancelar</Button>
                            <Button size='small' color='primary' onClick={validarFormularioEdit}>Editar</Button>
                        </CardActions>
                    </Card>
                </Modal>
            </Card >
            :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
    );
}

export default Historial;