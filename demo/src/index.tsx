import React from "react";
import { Container, createRoot } from "react-dom/client";
import { ASCII_LOGO, NAME } from "./config/branding.config";
import { Main } from "./Main";

// Render app
const root = createRoot(document.getElementById("root") as Container);
root.render(<React.StrictMode><Main/></React.StrictMode>);

// Log welcome message
const asciiLogoWidth = ASCII_LOGO.split("\n")[1].length;
const welcomeMessage = `Welcome to ${NAME}`;
const space = "\n\n" + " ".repeat(Math.ceil((asciiLogoWidth - welcomeMessage.length) / 2));
console.info(ASCII_LOGO + space + welcomeMessage);

// Remove trailing slash
window.onload = () => {
	if (window.location.pathname.endsWith("/"))
		window.history.pushState({}, "", window.location.pathname.replace(/\/+$/, ""));
};
