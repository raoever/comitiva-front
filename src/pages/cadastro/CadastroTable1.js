import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import {AddCircleOutline, Delete, Edit} from "@mui/icons-material";
import PopupForm from "../../components/PopupForm";
import Stack from "@mui/material/Stack";


export default function CollapsibleTable() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [rows, setRows] = React.useState([]);
	const [openPopup, setOpenPopup] = React.useState(false);
	const [popupId, setPopupId] = useState("");
	const [popupIdDep, setPopupIdDep] = useState("");
	const [addDependente, setAddDependente] = useState(false);
	const [upDate, setUpdate] = useState(false);

	useEffect(
		async () => {
			await axios
				.get(`${process.env.REACT_APP_API_URL}/cadastro`)
				.then(resp => {
					setIsLoading(false);
					setRows(resp.data);
					setUpdate(false);
				});
		},
		[openPopup, upDate]
	);

	function handleDelete(id) {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/cadastro/familia/${id}`)
			.then(resp => {
				setRows(rows.filter(i => i._id !== id));
				console.log(`${resp.data._id} foi deletado`);
			});
	}

	function handleDependenteDelete(idFamilia, idDependente) {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/cadastro/familia/dependente/${idFamilia}/${idDependente}`)
			.then(resp => {
				setUpdate(true);
				console.log(`${resp.data} foi deletado`);
			});
	}

	function handlePopup(_idFamilia, _idDependente, addDepenente) {
		setOpenPopup(true);
		setPopupId(_idFamilia);
		setPopupIdDep(_idDependente);
		setAddDependente(addDepenente);
	}

	return isLoading ? (
		<div>LOADING...</div>
	) : (
		<>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table" sx={{marginTop: 10}}>
					<TableHead>
						<TableRow>
							<TableCell/>
							<TableCell>Endereço</TableCell>
							<TableCell align="right">Pai</TableCell>
							<TableCell align="right">Nascimento</TableCell>
							<TableCell align="right">Turma</TableCell>
							<TableCell align="right">Ocupação</TableCell>
							<TableCell align="right">Contato</TableCell>
							<TableCell align="right">Mãe</TableCell>
							<TableCell align="right">Nascimento</TableCell>
							<TableCell align="right">Turma</TableCell>
							<TableCell align="right">Ocupação</TableCell>
							<TableCell align="right">Contato</TableCell>
							<TableCell align="right">Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => <Row key={row._id} row={row}/>)}
					</TableBody>
				</Table>
			</TableContainer>
			<PopupForm
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
				popupId={popupId}
				popupIdDep={popupIdDep}
				addDependente={addDependente}
			/>
		</>
	);

	function Row(props) {
		const {row} = props;
		const [open, setOpen] = React.useState(false);

		return (
			<React.Fragment>
				<TableRow sx={{"& > *": {borderBottom: "unset"}}}>
					<TableCell>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}
						>
							{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row">
						{
							row.endereco === "" ?
								"Sem Registro" :
								row.endereco
						}
					</TableCell>
					<TableCell align="right">
						{
							row.pai.nomePai === "" ?
								"Sem Registro" :
								row.pai.nomePai
						}
					</TableCell>
					<TableCell align="right">
						{
							row.pai.nascimentoPai === null ?
								"Sem Registro" :
								row.pai.nascimentoPai
						}
					</TableCell>
					<TableCell align="right">
						{
							row.pai.turmaPai === "" ?
								"Sem Registro" :
								row.pai.turmaPai
						}
						{row.pai.turmaPai}
					</TableCell>
					<TableCell align="right">
						{
							row.pai.ocupacaoPai === "" ?
								"Sem Registro" :
								row.pai.ocupacaoPai
						}
					</TableCell>
					<TableCell align="right">
						{
							row.pai.contatoPai === "" ?
								"Sem Registro" :
								row.pai.contatoPai
						}
					</TableCell>
					<TableCell align="right">
						{
							row.mae.nomeMae === "" ?
								"Sem Registro" :
								row.mae.nomeMae
						}
					</TableCell>
					<TableCell align="right">
						{
							row.mae.nascimentoMae === null ?
								"Sem Registro" :
								row.mae.nascimentoMae
						}
					</TableCell>
					<TableCell align="right">
						{
							row.mae.turmaMae === "" ?
								"Sem Registro" :
								row.mae.turmaMae
						}
					</TableCell>
					<TableCell align="right">
						{
							row.mae.ocupacaoMae === "" ?
								"Sem Registro" :
								row.mae.ocupacaoMae
						}
					</TableCell>
					<TableCell align="right">
						{
							row.mae.contatoMae === "" ?
								"Sem Registro" :
								row.mae.contatoMae
						}
					</TableCell>
					<TableCell align="right">
						<IconButton onClick={() => {
							handlePopup(row._id, null);
						}}>
							<Edit/>
						</IconButton>
						<IconButton onClick={() => handleDelete(row._id)}>
							<Delete/>
						</IconButton>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{margin: 1}}>
								<Stack direction={row}>
									<Typography variant="h6" gutterBottom component="div">
										Dependentes
									</Typography>
									<IconButton
										onClick={() => {
											handlePopup(row._id, null, true); //row._id, null, true
											console.log("Adicionar Dependente.");
										}}>
										<AddCircleOutline/>
									</IconButton>
								</Stack>
								<div>
									<Table size="small" sx={{marginLeft: 5}}>
										<TableHead>
											<TableRow>
												<TableCell>Nome</TableCell>
												<TableCell>Parentesco</TableCell>
												<TableCell align="right">Nascimento</TableCell>
												<TableCell align="right">Turma</TableCell>
												<TableCell align="right">Estuda</TableCell>
												<TableCell align="right">Escolaridade</TableCell>
												<TableCell align="right">Sapato</TableCell>
												<TableCell align="right">Calça</TableCell>
												<TableCell align="right">Camisa</TableCell>
												<TableCell align="right">Ações</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{row.dependentes.map(dependenteRow => (
												<TableRow key={dependenteRow.nomeDependente}>
													<TableCell component="th" scope="row">
														{
															dependenteRow.nomeDependente === "" ?
																"Sem Registro" :
																dependenteRow.nomeDependente
														}
													</TableCell>
													<TableCell>
														{
															dependenteRow.parentesco === "" ?
																"Sem Registro" :
																dependenteRow.parentesco
														}
													</TableCell>
													<TableCell align="right">
														{
															dependenteRow.nascimentoDependente === null ?
																"Sem Registro" :
																dependenteRow.nascimentoDependente
														}
													</TableCell>
													<TableCell align="right">
														{
															dependenteRow.turmaDependente === "" ?
																"Sem Registro" :
																dependenteRow.turmaDependente
														}
													</TableCell>
													<TableCell align="right">
														{
															dependenteRow.estuda === "" ?
																"Sem Registro" :
																dependenteRow.estuda
														}
													</TableCell>
													<TableCell align="right">
														{
															dependenteRow.escolaridade === "" ?
																"Sem Registro" :
																dependenteRow.escolaridade
														}
													</TableCell>
													<TableCell align="right">
														{
															dependenteRow.tamanhoPe === "" ?
																"Sem Registro" :
																dependenteRow.tamanhoPe
														}
													</TableCell>
													<TableCell align="right">
														{
															dependenteRow.tamanhoCalca === "" ?
																"Sem Registro" :
																dependenteRow.tamanhoCalca
														}
													</TableCell>
													<TableCell align="right">
														{
															dependenteRow.tamanhoCamisa === "" ?
																"Sem Registro" :
																dependenteRow.tamanhoCamisa
														}
													</TableCell>
													<TableCell align="right">
														<IconButton
															onClick={() => {
																handlePopup(row._id, dependenteRow._id, true);
															}}>
															<Edit/>
														</IconButton>
														<IconButton
															onClick={() => handleDependenteDelete(row._id, dependenteRow._id)}>
															<Delete/>
														</IconButton>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}
}
