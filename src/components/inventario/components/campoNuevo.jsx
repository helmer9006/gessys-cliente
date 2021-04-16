import React from 'react';
import {
    FormControl,
    IconButton,
    TextField,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const CampoNuevo = ({ item, disabled, onEdit, onDelete }) => {

    return (
        <div style={{ display: 'flex', paddingBottom: 15 }}>
            <FormControl style={{ width: '30%' }}>
                <TextField
                    name="clave"
                    label="Clave"
                    variant="outlined"
                    value={item.clave}
                    onChange={onEdit}
                    disabled={disabled}
                />
            </FormControl>
            <FormControl style={{ width: '70%' }}>
                <TextField
                    name="valor"
                    label="Valor"
                    variant="outlined"
                    value={item.valor}
                    onChange={onEdit}
                    disabled={disabled}
                />
            </FormControl>
            <IconButton aria-label="delete" color={!disabled ? 'secondary' : 'default'} onClick={!disabled ? onDelete : undefined} >
                <Delete />
            </IconButton>
        </div>
    );
}

export default CampoNuevo;