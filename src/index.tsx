import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ASCII_LOGO, NAME } from "./config/branding.config";

export const START_DATE = new Date();

// Render app
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<React.StrictMode>
	<App/>
</React.StrictMode>);

// Log welcome message
const asciiLogoWidth = ASCII_LOGO.split("\n")[1].length;
const welcomeMessage = `Welcome to ${NAME}`;
const space = "\n\n" + " ".repeat(Math.ceil((asciiLogoWidth - welcomeMessage.length) / 2));
console.info(ASCII_LOGO + space + welcomeMessage);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);