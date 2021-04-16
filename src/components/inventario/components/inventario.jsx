import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const Inventario = ({ item, onEdit, onDelete }) => {

    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <div className={classes.column}>
                    <Typography className={classes.heading}>{item.codigo}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{item.dependencia?.nombre ?? 'N/A'}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{item.categoria?.nombre ?? 'N/A'}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{item.usuario?.nombre ?? 'N/A'}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{item.responsable?.nombre ?? 'N/A'}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{moment(item.creacion).format('DD/MM/YYYY') ?? 'N/A'}</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <div className={classes.row}>
                    <Typography variant='inherit' color='textSecondary'>{'Marca: '}</Typography>
                    <Typography variant='inherit'>{item.marca}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='inherit' color='textSecondary'>{'Modelo: '}</Typography>
                    <Typography variant='inherit'>{item.modelo}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='inherit' color='textSecondary'>{'No. serial: '}</Typography>
                    <Typography variant='inherit'>{item.serial}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='inherit' color='textSecondary'>{'Piso: '}</Typography>
                    <Typography variant='inherit'>{item.piso}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='inherit' color='textSecondary'>{'Proveedor: '}</Typography>
                    <Typography variant='inherit'>{item.proveedor?.nombre ?? 'N/A'}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='inherit' color='textSecondary'>{'Observación: '}</Typography>
                    <Typography variant='inherit'>{item.observacion ?? 'N/A'}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='inherit' color='textSecondary'>{'Estado: '}</Typography>
                    <Typography variant='inherit'>{item.estado ?? 'N/A'}</Typography>
                </div>
                {
                    item.nuevosCampos.map((value, index) => {
                        return (
                            <div className={classes.row} key={index.toString()}>
                                <Typography variant='inherit' color='textSecondary'>{value.clave + ': '}</Typography>
                                <Typography variant='inherit'>{value.valor ?? 'N/A'}</Typography>
                            </div>
                        );
                    })
                }
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <Button size='medium' color='secondary' onClick={() => onDelete(item._id)}>Eliminar</Button>
                <Button size='medium' color='primary' onClick={() => onEdit(item._id)}>Editar</Button>
            </AccordionActions>
        </Accordion>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    details: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        flex: 1,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
}));

export default Inventario;