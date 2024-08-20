import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Provider from "./context/FirestoreContext";
import AuthProvider, { useAuthContext } from "./context/AuthContext";
import Layout from "./components/Layout";
import StockImages from "./components/StockImages";
import Single from "./components/Single";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppRouts = () => {
	const { currentUser } = useAuthContext();
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="images/:id" element={<Single />} />
			{currentUser && <Route path="/stockImages" element={<StockImages />} />}
		</Routes>
	);
};
root.render(
	<React.StrictMode>
		<AuthProvider>
			<Provider>
				<Router>
					<Layout>
						<AppRouts />
					</Layout>
				</Router>
			</Provider>
		</AuthProvider>
	</React.StrictMode>
);
