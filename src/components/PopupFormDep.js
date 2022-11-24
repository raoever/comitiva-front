import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
                    <CadastroForm
						popupId={popupId}
						popupIdDep={popupIdDep}
						setOpenPopup={setOpenPopup}
						openPopup={openPopup}
						addDependente={addDependente}
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