import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import {Controller, useForm} from "react-hook-form";
import {LocalizationProvider} from "@mui/lab";
import brLocale from "date-fns/locale/pt-BR";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";

const PopupForm = props => {
	const {control, handleSubmit, setValue} = useForm({
		defaultValues: {
			_id: "",
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
		}
	});


	const {openPopup, setOpenPopup, popupId, oldData} = props;

	const handleClose = () => {
		setOpenPopup(false);
	};

	function handleOldData() {
		oldData.map((familia) => {
			Object.keys(familia).forEach((key) => setValue(key, familia[key]));
		});
	}

	useEffect(() => {
		console.log(popupId);
		handleOldData();
	}, [handleOldData()]);

	const onSubmit = (data, e) => console.log(data, e);
	const onError = (errors, e) => console.log(errors, e);


	return (
		<>
			<Dialog open={openPopup} onClose={handleClose} fullWidth>
				<DialogTitle>Editar Família</DialogTitle>
				<DialogContent>
					<DialogContentText/>
					<form onSubmit={handleSubmit(onSubmit, onError)}>
						<Stack spacing={3}>
							<Controller
								control={control}
								name="endereco"
								render={({field}) => (
									<TextField {...field} label="Endereco" variant="standard"/>
								)}
							/>
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
										locale={brLocale}
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
										locale={brLocale}
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
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button type="submit">Editar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PopupForm;