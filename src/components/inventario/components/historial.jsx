import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import moment from 'moment';

const Historial = ({ item, onEdit, onDelete, showFile }) => {

    return (
        <div style={{ display: 'flex', paddingBottom: 15 }}>
            <head>
                <base href="~/" />
            </head>
            <Card style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <CardContent style={{ width: '90%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography style={{ fontSize: 14, }} color='textSecondary' gutterBottom>{moment(item.creacion).format('DD/MM/YYYY ')}</Typography>
                        <a style={{ fontSize: 14, color: '#1890ff', marginLeft: 15 }} href={item.anexo[0].url} target='_blank'>{'Ver archivo'}</a>
                    </div>
                    <Typography>{item.observacion}</Typography>
                </CardContent>
                <CardContent style={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton color='primary' aria-label='Editar' component='span' onClick={onEdit}>
                        <Edit />
                    </IconButton>
                    <IconButton color='secondary' aria-label='Editar' component='span' onClick={onDelete}>
                        <Delete />
                    </IconButton>
                </CardContent>
            </Card>
        </div>
    );
}

export default Historial;