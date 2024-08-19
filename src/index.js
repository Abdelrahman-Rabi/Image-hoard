import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Provider from "./context/FirestoreContext";
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<Provider>
				<App />
			</Provider>
		</AuthProvider>
	</React.StrictMode>
);
