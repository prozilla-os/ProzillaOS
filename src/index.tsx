import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { ASCII_LOGO, NAME } from "./config/branding.config";
import { TrackingManager } from "./features/tracking/trackingManager";
import { TimeManager } from "./features/_utils/time.utils";

TimeManager.reset();

TrackingManager.initialize();

// Render app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
	<App/>
</React.StrictMode>);

// Log welcome message
const asciiLogoWidth = ASCII_LOGO.split("\n")[1].length;
const welcomeMessage = `Welcome to ${NAME}`;
const space = "\n\n" + " ".repeat(Math.ceil((asciiLogoWidth - welcomeMessage.length) / 2));
console.info(ASCII_LOGO + space + welcomeMessage);