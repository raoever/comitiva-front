import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const PopupFormDep = props => {

	const {openPopupDep, setOpenPopupDep} = props;
	const handleCloseDep = () => {
		setOpenPopupDep(false);
	};


	return (
		<>
			<Dialog open={openPopupDep} onClose={handleCloseDep}>
				<DialogTitle>Editar Família</DialogTitle>
				<DialogContent>
					<DialogContentText/>
					<TextField
						margin="dense"
						name="endereco"
						label="Dependente"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Parentesco"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Nascimento"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Turma"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Estuda?"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Escolaridade"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Calça"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Veste"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="pai.nomePai"
						label="Camisa"
						type="text"
						fullWidth
						variant="standard"
					/>


				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDep}>Cancelar</Button>
					<Button onClick={handleCloseDep}>Editar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PopupFormDep;