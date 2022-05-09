import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CadastroForm from "../pages/cadastro/CadastroForm";
import {Close} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const PopupForm = props => {

	const {openPopup, setOpenPopup, popupId, popupIdDep, addDependente} = props;

	const handleClose = () => {
		setOpenPopup(false);
	};

	return (
		<>
			<Dialog open={openPopup} onClose={handleClose} fullWidth maxWidth="md">
				<DialogTitle style={{display: "flex"}}>
					Editar Família
					<IconButton onClick={handleClose} style={{marginLeft: "auto"}}>
						<Close/>
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<CadastroForm
						popupId={popupId}
						popupIdDep={popupIdDep}
						setOpenPopup={setOpenPopup}
						openPopup={openPopup}
						addDependente={addDependente}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default PopupForm;