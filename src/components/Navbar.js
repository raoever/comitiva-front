import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useAuth0} from "@auth0/auth0-react";

const ResponsiveAppBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const {logout} = useAuth0();

	return (
		<AppBar style={{background: "#8C0707"}} position="fixed">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						fontFamily="CAC Pinafore"
						variant="h2"
						noWrap
						component="div"
						sx={{mr: 2, display: {xs: "none", md: "flex"}}}
					>
						Comitiva Esperança
					</Typography>

					<Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left"
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: {xs: "block", md: "none"}
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Button href="/" color="inherit">
									Famílias
								</Button>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Button href="/cadastro" color="inherit">
									Cadastro
								</Button>
							</MenuItem>
						</Menu>
					</Box>
					<Typography
						fontFamily="CAC Pinafore"
						variant="h2"
						noWrap
						component="div"
						sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}
					>
						Comitiva Esperança
					</Typography>
					<Box sx={{flexGrow: 2, display: {xs: "none", md: "flex"}, justifyContent: "flex-start"}}>
						<Button href="/" color="inherit">
							Famílias
						</Button>
						<Button href="/cadastro" color="inherit">
							Cadastro
						</Button>
					</Box>

					<Box sx={{flexGrow: 0}}>
						<Button color={"inherit"}
								onClick={() => logout({returnTo: window.location.origin})}>Logout</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;