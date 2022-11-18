import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import logo from "../../static/logo.jpeg";
import {useAuth0} from "@auth0/auth0-react";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Comitiva Esperança
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function SignInSide() { //{setToken}
	const {loginWithPopup} = useAuth0();

	return (
		<>
			<AppBar style={{ background: "#8C0707"}} position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							fontFamily="CAC Pinafore"
							variant="h2"
							noWrap
							component="div"
							sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
						>
							Comitiva Esperança
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />
						<Typography
							fontFamily="CAC Pinafore"
							variant="h2"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
						>
							Comitiva Esperança
						</Typography>
						<Box
							sx={{
								flexGrow: 2,
								display: { xs: "none", md: "flex" },
								justifyContent: "flex-start"
							}}
						/>
					</Toolbar>
				</Container>
			</AppBar>

			<ThemeProvider theme={theme}>
				<Grid container component="main" sx={{ height: "100vh" }}>
					<CssBaseline />
					<Grid
						item
						xs={false}
						sm={4}
						md={8}
						sx={{
							backgroundImage: `url(${logo})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "auto",
							backgroundPosition: "center",
							marginTop: 3,
						}}
					/>
					<Grid
						item
						xs={10}
						sm={6}
						md={4}
						component={Paper}
						elevation={6}
						square
					>
						<Box
							sx={{
								my: 6,
								mx: 3,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								marginTop: 20,
							}}
						>

							<Typography component="h1" variant="h5">
								Por favor faça o Login...
							</Typography>
							<Box
								noValidate
								sx={{ mt: 1 }}
							>

								<Button
									color="success"
									onClick={() => loginWithPopup()}
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Entrar
								</Button>
								<Grid container>
									<Grid item xs />
									<Grid item />
								</Grid>
								<Copyright sx={{ mt: 5 }} />
							</Box>
						</Box>
					</Grid>
				</Grid>
			</ThemeProvider>
		</>
	);
}