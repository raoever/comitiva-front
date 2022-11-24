import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Remove} from "@mui/icons-material";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {FormHelperText, InputLabel, Select, TextField} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import brLocale from "date-fns/locale/pt-BR";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Container from "@mui/material/Container";
import {useLocation} from "wouter";

export default function CadastroForm(props) {

	const [editando, setEditando] = useState(false);
	const [popupId, setPopupId] = useState(false);
	const [eDependente, setEDependente] = useState(false);

	const {setOpenPopup} = props;
	const [,setLocation] = useLocation();
	const {control, handleSubmit, reset, setValue} = useForm({
		defaultValues: {
			_id: props.popupId,
			endereco: "",
			pai: {
				nomePai: "",
				nascimentoPai: null,
				turmaPai: "",
				ocupacaoPai: "",
				contatoPai: ""
			},
			mae: {
				nomeMae: "",
				nascimentoMae: null,
				turmaMae: "",
				ocupacaoMae: "",
				contatoMae: ""
			},
			dependentes: [
				{
					nomeDependente: "",
					parentesco: "",
					nascimentoDependente: null,
					turmaDependente: "",
					estuda: "",
					escolaridade: "",
					tamanhoPe: "",
					tamanhoCalca: "",
					tamanhoCamisa: ""
				}
			]
		}
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: "dependentes"
	});

	const onSubmit = async familia => {
		if (!editando) {
			axios
				.post(`${process.env.REACT_APP_API_URL}/cadastro/familia`, familia)
				.then(res => {
					reset();
					setLocation("/");
					console.log(res.data);
				});
		} else {
			axios
				.put(`${process.env.REACT_APP_API_URL}/cadastro/familia/${popupId}`, familia)
				.then(res => {
					setOpenPopup(false);
					console.log(res.data);
				});
		}

	};

	if (props.popupId !== undefined && props.popupId.length > 0) {
		useEffect(
			async () => {
				await axios
					.get(`${process.env.REACT_APP_API_URL}/cadastro/familia/${props.popupId}`)
					.then(resp => {
						setValue("endereco", resp.data.endereco);
						Object.keys(resp.data).forEach((key) => setValue(key, resp.data[key]));
						setEditando(true);
						setPopupId(props.popupId);
						if (props.addDependente) {
							append({
								nomeDependente: "",
								parentesco: "",
								nascimentoDependente: null,
								turma: "",
								estuda: "",
								escolaridade: "",
								tamanhoPe: "",
								tamanhoCamisa: "",
								tamanhoCalca: ""
							});
							setEDependente(true);
						}
						if (props.popupIdDep !== null && props.popupIdDep.length > 0) {
							setEDependente(true);
						}
					});
			},
			[]
		);
	}


	return (
		<>
			<Container maxWidth="md">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1>Formulário de Cadastro</h1>
					<Card sx={{minWidth: 400, display: eDependente && editando ? "none" : "block"}}>
						<CardContent>
							<h2>Endereço</h2>
							<Stack spacing={1}>
								<Controller
									control={control}
									name="endereco"
									render={({field}) => (
										<TextField {...field} label="Endereço" variant="standard"/>
									)}
								/>
							</Stack>
						</CardContent>
					</Card>
					<br/>
					<Card style={{display: editando && eDependente ? "none" : null}}>
						<CardContent>
							<h2>Dados do Pai</h2>
							<Stack spacing={2}>
								<Controller
									control={control}
									name="pai.nomePai"
									render={({field}) => (
										<TextField {...field} label="Pai" variant="standard"/>
									)}
								/>
								<Controller
									control={control}
									name="pai.nascimentoPai"
									defaultValue={new Date()}
									render={({field}) => (
										<LocalizationProvider
											adapterLocale={brLocale}
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												openTo="year"
												views={["year", "month", "day"]}
												onChange={field.onChange}
												value={field.value}
												renderInput={params => (
													<TextField {...params} variant="standard"/>
												)}
											/>
										</LocalizationProvider>
									)}
								/>
								<Controller
									control={control}
									name="pai.turmaPai"
									render={({field}) => (
										<TextField {...field} label="Turma" variant="standard"/>
									)}
								/>
								<Controller
									control={control}
									name="pai.ocupacaoPai"
									render={({field}) => (
										<TextField {...field} label="Ocupação" variant="standard"/>
									)}
								/>
								<Controller
									control={control}
									name="pai.contatoPai"
									render={({field}) => (
										<TextField {...field} label="Contato" variant="standard"/>
									)}
								/>
							</Stack>
						</CardContent>
					</Card>
					<br/>
					<Card style={{display: editando && eDependente ? "none" : "block"}}>
						<CardContent>
							<h2>Dados da Mãe</h2>
							<Stack spacing={2}>
								<Controller
									control={control}
									name="mae.nomeMae"
									render={({field}) => (
										<TextField {...field} label="Mãe" variant="standard"/>
									)}
								/>
								<Controller
									control={control}
									name="mae.nascimentoMae"
									defaultValue={new Date()}
									render={({field}) => (
										<LocalizationProvider
											adapterLocale={brLocale}
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												openTo="year"
												views={["year", "month", "day"]}
												onChange={field.onChange}
												value={field.value}
												renderInput={params => (
													<TextField {...params} variant="standard"/>
												)}
											/>
										</LocalizationProvider>
									)}
								/>
								<Controller
									control={control}
									name="mae.turmaMae"
									render={({field}) => (
										<TextField {...field} label="Turma" variant="standard"/>
									)}
								/>
								<Controller
									control={control}
									name="mae.ocupacaoMae"
									render={({field}) => (
										<TextField {...field} label="Ocupação" variant="standard"/>
									)}
								/>
								<Controller
									control={control}
									name="mae.contatoMae"
									render={({field}) => (
										<TextField {...field} label="Contato" variant="standard"/>
									)}
								/>
							</Stack>
						</CardContent>
					</Card>
					<br/>
					<Card style={{display: editando && !eDependente ? "none" : "block"}}>
						<CardContent>
							<h2>Dados do Dependente</h2>
							{fields.map((item, index) => (
								<div key={item.id}>
									<h3>Dependente {index + 1}</h3>
									<Stack spacing={1}>
										<Controller
											control={control}
											name={`dependentes[${index}].nomeDependente`}
											render={({field}) => (
												<TextField
													{...field}
													label="Dependente"
													variant="standard"
												/>
											)}
										/>
										<Controller
											control={control}
											name={`dependentes[${index}].parentesco`}
											render={({field}) => (
												<TextField
													{...field}
													label="Parentesco"
													variant="standard"
												/>
											)}
										/>
										<Controller
											control={control}
											name={`dependentes[${index}].nascimentoDependente`}
											defaultValue={new Date()}
											render={({field}) => (
												<LocalizationProvider
													adapterLocale={brLocale}
													dateAdapter={AdapterDateFns}
												>
													<DatePicker
														openTo="year"
														label="Data de Nascimento"
														views={["year", "month", "day"]}
														onChange={field.onChange}
														value={field.value}
														renderInput={params => (
															<TextField {...params} variant="standard"/>
														)}
													/>
												</LocalizationProvider>
											)}
										/>
										<Controller
											control={control}
											name={`dependentes[${index}].turmaDependente`}
											render={({field}) => (
												<TextField
													{...field}
													label="Turma"
													variant="standard"
												/>
											)}
										/>
										<Controller
											control={control}
											name={`dependentes[${index}].estuda`}
											defaultValue={true}
											render={({field}) => (
												<FormControl
													variant="standard"
													sx={{m: 1, minWidth: 120}}
												>
													<InputLabel>Estuda?</InputLabel>
													<Select
														value={field.value}
														onChange={field.onChange}
														label="Estuda"
													>
														<MenuItem value="">
															<em>None</em>
														</MenuItem>
														<MenuItem value="Sim">Sim</MenuItem>
														<MenuItem value="Não">Não</MenuItem>
													</Select>
												</FormControl>
											)}
										/>

										<Controller
											control={control}
											name={`dependentes[${index}].escolaridade`}
											defaultValue={true}
											render={({field}) => (
												<FormControl
													variant="standard"
													sx={{m: 1, minWidth: 120}}
												>
													<InputLabel>Escolaridade?</InputLabel>
													<Select
														value={field.value}
														onChange={field.onChange}
														label="Escolaridade"
													>
														<MenuItem value="">
															<em>None</em>
														</MenuItem>
														<MenuItem value="Educação Infantil">Educação Infantil</MenuItem>
														<MenuItem value="Pré-escola">Pré-escola</MenuItem>
														<MenuItem value="Ensino Fundamental">Ensino
															Fundamental</MenuItem>
														<MenuItem value="Ensino Médio">Ensino Médio</MenuItem>
														<MenuItem value="Ensino Médio Técnico">Ensino Médio
															Técnico</MenuItem>
														<MenuItem value="EJA">EJA</MenuItem>
														<MenuItem value="Ensino Superior">Ensino Superior</MenuItem>
													</Select>
													<FormHelperText>
														Educação Infantil: duração de 4 anos, com alunos de 0 a 3
														anos;<br/>
														Pré-escola: duração de 3 anos, com alunos de 4 a 6 anos;<br/>
														Ensino Fundamental: duração de 9 anos, com alunos de 6 a 14
														anos;<br/>
														Ensino Médio: duração de 3 anos, com alunos de 15 a 17
														anos;<br/>
														Ensino Médio Técnico: duração é variável, podendo ser de 1 a 3
														anos.<br/>
														Educação de Jovens e Adultos (EJA);<br/>
														Ensino Superior.
													</FormHelperText>
												</FormControl>
											)}
										/>

										<Controller
											control={control}
											name={`dependentes[${index}].tamanhoPe`}
											render={({field}) => (
												<TextField
													{...field}
													label="Quanto Calça"
													variant="standard"
												/>
											)}
										/>
										<Controller
											control={control}
											name={`dependentes[${index}].tamanhoCalca`}
											render={({field}) => (
												<TextField
													{...field}
													label="Tamanho Calça"
													variant="standard"
												/>
											)}
										/>
										<Controller
											control={control}
											name={`dependentes[${index}].tamanhoCamisa`}
											render={({field}) => (
												<TextField
													{...field}
													label="Tamanha Camisa"
													variant="standard"
												/>
											)}
										/>
									</Stack>
									<br/>
									<Box>
										<IconButton onClick={() => remove(index)}>
											<Remove/>
										</IconButton>
									</Box>
								</div>
							))}
						</CardContent>
					</Card>
					{editando && !eDependente ?
						(<br/>)
						:
						(<Button
							onClick={() => {
								append({
									nomeDependente: "",
									parentesco: "",
									nascimentoDependente: null,
									turma: "",
									estuda: "",
									escolaridade: "",
									tamanhoPe: "",
									tamanhoCamisa: "",
									tamanhoCalca: ""
								});
							}}
							id="idAddButton"
						>
							Adicionar Dependente
						</Button>)
					}
					<br/>
					<Box display="flex" justifyContent="flex-end">
						<Button variant="outlined" type={"submit"}>
							{editando ? "Editar" : "Enviar"}
						</Button>
					</Box>
				</form>
			</Container>
		</>
	);
}
