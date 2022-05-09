import IconButton from "@mui/material/IconButton";
import React from "react";
import {Delete, Edit} from "@mui/icons-material";

export const COLUMNS = [
	{
		headerName: "Endereço",
		field: "endereco"
	},
	{
		headerName: "Pai",
		field: "pai.nomePai"
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
			<IconButton>
				<Delete/>
			</IconButton>
			<IconButton>
				<Edit/>
			</IconButton>
		</div>
	}
];