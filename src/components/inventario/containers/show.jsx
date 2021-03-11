import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import axios from '../../../config/axios';
import tokenAuth from '../../../config/tokenAuth';
import Historial from './historial';
import Edit from './edit'

const Show = ({ match }) => {

    const [inventario, setInventario] = useState({});

    useEffect(() => {
        makeRequest();
    }, []);

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

            const response = await axios.get(`/inventario/id/${match.params.id}`);
            if (response.status === 200) {
                console.log('inventario', response.data);
                setInventario(response.data)
            } else {
                console.log('[Index] makeRequest', response);
            }
        } catch (e) {
            console.log('[Index] makeRequest error', e);
            showError();
        }
    }

    return (
        <>
            <Edit inventario={inventario} />
            <Historial inventario={inventario} />
        </>
    );
}

export default Show;