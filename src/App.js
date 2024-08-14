import { useReducer, useMemo, useContext, useEffect } from "react";
import Card from "./components/Card";
import fireStore from "./handlers/firestore";
import "./App.css";
import Layout from "./components/Layout";
import { Context } from "./context";

function App() {
	const { state, read } = useContext(Context);

	const count = useMemo(() => {
		return `You have ${state.items.length} image${state.items.length > 1 ? "s" : ""}`;
	}, [state.items]);

	useEffect(() => {
		read();
	}, []);

	return (
		<>
			<Layout>
				<h1 className="text-center">Gallery</h1>
				{count}
				<div className="row">
					{state.items.map((photo, index) => (
						<Card key={index} {...photo} />
					))}
				</div>
			</Layout>
		</>
	);
}

export default App;
