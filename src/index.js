import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ASCII_LOGO } from "./constants/branding.js";

export const START_DATE = new Date();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);

console.log(ASCII_LOGO);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
