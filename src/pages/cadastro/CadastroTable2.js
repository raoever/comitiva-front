import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";

export default function CadastroTable2() {
	const [familias, setFamilias] = useState([]);

	useEffect(async () => {
		await axios.get(`${process.env.REACT_APP_API_URL}/cadastro`)
			.then((resp) => {
				console.log(resp);
				setFamilias(resp.data);
			});
	}, []);

	return (
		<>
			<Container>
				<br/>
				<TableContainer component={Paper}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell style={{background: "#267d1d", color: "white"}}>Endereço</TableCell>
								<TableCell style={{background: "#267d1d", color: "white"}}
										   align="center">Pai</TableCell>
								<TableCell style={{background: "#267d1d", color: "white"}}
										   align="center">Mãe</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{familias.map((row) => (
								<TableRow
									key={row._id}
									sx={{"&:last-child td, &:last-child th": {border: 0}}}
								>
									<TableCell component="th" scope="row">
										{row.endereco}
									</TableCell>
									<TableCell align="center">{row.pai.nomePai}</TableCell>
									<TableCell align="center">{row.mae.nomeMae}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
}