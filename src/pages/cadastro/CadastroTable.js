import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {Grid, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {Delete, Edit} from "@mui/icons-material";

export default function CadastroTable() {

	const [gridApi, setGridApi] = useState(null);
	const gridRef = useRef();
	const [update, setUpdate] = React.useState(0);

	// function onGridReady(params) {
	// 	console.log(params.api);
	// 	setGridApi(params.api);
	// }

	// const getFamilias = async () => {
	// 	await axios.get(`${process.env.REACT_APP_API_URL}/cadastro`)
	// 		.then((resp) => {
	// 			setGridApi(resp);
	// 		});
	// };

	// useEffect(async () => {
	// 	await axios.get(`${process.env.REACT_APP_API_URL}/cadastro`)
	// 		.then((resp) => {
	// 			console.log(resp);
	// 			setGridApi(resp.data);
	// 		});
	// }, [update]);

	const onGridReady = useCallback((params) => {
		fetch(`${process.env.REACT_APP_API_URL}/cadastro`)
			.then((resp) => resp.json())
			.then((data) => {
				setGridApi(data);
			});
	}, []);


	function handleDelete(id) {
		axios.delete(`${process.env.REACT_APP_API_URL}/cadastro/familia/${id}`)
			.then(resp => {
				console.log(resp);
				setUpdate(update + 1);
			});

	}

	function handleUpdate(data) {
		console.log(data);
	}

	const columns = [
		{
			headerName: "Endereço", cellRenderer: "agGroupCellRenderer",
			field: "endereco"
		},
		{
			headerName: "Pai",
			field: "pai.nomePai"
		}, {
			headerName: "Nascimento Pai",
			field: "pai.nascimentoPai"
		},
		{
			headerName: "Turma",
			field: "pai.turmaPai"
		},
		{
			headerName: "Ocupação",
			field: "pai.ocupacaoPai"
		},
		{
			headerName: "Contato",
			field: "pai.contatoPai"
		},
		{
			headerName: "Mãe",
			field: "mae.nomeMae"
		},
		{
			headerName: "Ações",
			type: "rightAligned",
			field: "id",
			cellRendererFramework: (params) => <div>
				<IconButton onClick={() => handleDelete(params.data._id)}>
					<Delete/>
				</IconButton>
				<IconButton onClick={() => handleUpdate(params.data)}>
					<Edit/>
				</IconButton>
			</div>
		}
	];

	const detailCellRendererParams = {
		// provide the Grid Options to use on the Detail Grid
		detailGridOptions: {
			columnDefs: [
				{
					headerName: "nomeDependente",
					field: "dependentes.nomeDependente"
				},
			]
		},
		getDetailRowData: function (params) {
			params.successCallback(params.data.dependentes);
		}
	};


	const defColDef = {
		sortable: true, filter: true, editable: false, floatingFilter: false, flex: 1
	};


	function onFilterTextChange(e) {
		gridRef.current.api.setQuickFilter(e.target.value);
	}

	return (
		<div className="ag-theme-alpine" style={{height: 400, width: 1500}}>
			<Grid display={"flex"} paddingBottom={2} paddingTop={2} justifyContent="flex-end">
				<Stack direction="row" spacing={2} justifyContent="flex-end">
					<TextField
						type={"search"}
						onChange={onFilterTextChange}
						label={"Procurar"}
						variant={"standard"}
						InputProps={{
							endAdornment: (
								<IconButton>
									<SearchIcon/>
								</IconButton>
							)
						}}
					/>
					<Button href="/cadastro" variant={"outlined"}>Cadastrar</Button>
				</Stack>
			</Grid>
			<AgGridReact
				ref={gridRef}
				rowData={gridApi}
				masterDetail={true}
				columnDefs={columns}
				detailCellRendererParams={detailCellRendererParams}
				defaultColDef={defColDef}
				onGridReady={onGridReady}
			/>
		</div>
	);
}