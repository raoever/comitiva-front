import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./fonts/Varela_Round/VarelaRound-Regular.ttf";
import {Auth0Provider} from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID;

ReactDOM.render(
	<Auth0Provider
		domain={domain}
		clientId={clientId}
		redirectUri={window.location.origin}
	>
		<App/>
	</Auth0Provider>,
	document.getElementById("root")
);

