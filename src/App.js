import React from "react";
import Navbar from "./components/Navbar";
import CadastroLogin from "./pages/login/CadastroLogin";
import {useAuth0} from "@auth0/auth0-react";
import {Route, Switch} from "wouter";
import CadastroTable1 from "./pages/cadastro/CadastroTable1";
import CadastroForm from "./pages/cadastro/CadastroForm";
import Footer from "./components/Footer";
import Logout from "./pages/login/Logout";


function App() {
	const {isLoading, isAuthenticated} = useAuth0();
	if (isLoading) return <div>LOADING...</div>;
	return (
		<div>
			{isAuthenticated ?
				(
					<CadastroLogin/>
				)
				:
				(
					<>
						<Navbar/>
						<main>
							<Switch>
								<Route path="/" component={CadastroTable1}/>
								<Route path="/cadastro" component={CadastroForm}/>
								<Route path="/cadastro/:id" component={CadastroForm}/>
								<Route path="/logout" component={Logout}/>
								<Route path="/login" component={CadastroLogin}/>
							</Switch>
						</main>
						<Footer/>
					</>
				)
			}
		</div>
	);
}

export default App;
