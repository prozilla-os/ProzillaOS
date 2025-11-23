import React from "react";
import { Container, createRoot } from "react-dom/client";
import { Main } from "./Main";

// Render app
const root = createRoot(document.getElementById("root") as Container);
root.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
);

// Remove trailing slash
window.onload = () => {
	if (window.location.pathname.endsWith("/"))
		window.history.pushState({}, "", window.location.pathname.replace(/\/+$/, ""));
};
