import { BorderAll } from '@material-ui/icons';
import { upperCase } from 'lodash';
import React from 'react'
import { useSelector } from 'react-redux';

const ReporteTicketsPorUsuarioPdf = ({ref}) => {

	const tickets = useSelector((state) => state.tickets.tickets);

	//DESTRUCTURING
	let {
		_id,
		titulo,
		descripcion: descripcionEditar,
		tipo,
		dependencia,
		nombreDependencia,
		categoria,
		inventario,
		nombreCategoria,
		prioridad,
		estado,
		usuario,
		nombreUsuario,
		creacion,
		codigo
	} = tickets;

	const array = [];

	tickets.map((item) => {
		array.push(
			< tr key={item._id}>
				<td><h1 style={{ fontSize: "12px" }}>{item.codigo}</h1></td>
				<td><h1 style={{ fontSize: "12px" }}>{upperCase(item.estado)}</h1></td>
				<td><h1 style={{ fontSize: "12px" }}>{item.creacion}</h1></td>
				<td><h1 style={{ fontSize: "12px", textAlign: "left" }}>{upperCase(item.titulo)}</h1></td>
				<td><h1 style={{ fontSize: "12px" }}>{item.nombreDependencia}</h1></td>
				<td><h1 style={{ fontSize: "12px" }}>{item.nombreCategoria}</h1></td>
			</tr>
		)

	})

	return (
			<div ref={ref} style={{ width: "1200px", height: "100vh", margin: "auto", textAlign: "center" }}>
				<table border="1px solid #000" width="1200px" >
					<tbody>
						<tr>
							<td width="300px">
								<img width="200px" height="100px" src="http://pixel.nymag.com/imgs/daily/vulture/2015/04/28/28-dragon-ball-z-goku.w529.h529.jpg" alt="" />
							</td>

							<td>
								<h1 style={{ fontWeight: "bold", fontSize: "16px" }}> UNIDAD CLINICA LA MAGDALENA SAS </h1>
								<h1 style={{ fontWeight: "bold", fontSize: "16px" }}> INFORME DE TICKET POR USUARIO</h1>
							</td>

							<td style={{ fontWeight: "bold" }} width="300px">
								<h1 style={{ fontWeight: "bold", fontSize: "16px" }}> FECHA </h1>
								<h1 style={{ fontWeight: "bold", fontSize: "16px" }}> 22/10/2021</h1>
							</td>
						</tr>
					</tbody>
				</table>
				<table border="1px solid #000" width="1200px" style={{ marginTop: "50px" }}>
					<tbody>
						<tr>
							<td width="70px" style={{ fontWeight: "bold", fontSize: "16px" }}>Código</td>
							<td width="100px" style={{ fontWeight: "bold", fontSize: "16px" }}>Estado</td>
							<td width="auto" style={{ fontWeight: "bold", fontSize: "16px" }}>Fecha</td>
							<td width="auto" style={{ fontWeight: "bold", fontSize: "16px" }}>Título</td>
							<td width="auto" style={{ fontWeight: "bold", fontSize: "16px" }}>Dependencia</td>
							<td width="auto" style={{ fontWeight: "bold", fontSize: "16px" }}>Categoría</td>
						</tr>
						{array}

					</tbody>
				</table>

			</div >

	)
}

export default ReporteTicketsPorUsuarioPdf;