import { useEffect, useState, useReducer } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import "./App.css";
import UploadForm from "./components/UploadForm";
import Layout from "./components/Layout";

const photos = [];

const initialState = {
	items: photos,
	inputs: { title: null, file: null, path: null },
	isCollapsed: false,
};

const handleChange = (state, e) => {
	if (e.target.name === "file") {
		return { ...state.inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0]) };
	} else return { ...state.inputs, title: e.target.value };
};

function reducer(state, action) {
	console.log("action: ", action);
	switch (action.type) {
		case "setItem":
			return {
				...state,
				items: [state.inputs, ...state.items],
				inputs: { title: null, file: null, path: null },
			};
		case "setInputs":
			return {
				...state,
				inputs: handleChange(state, action.payload.value),
			};
		case "collapse":
			return {
				...state,
				isCollapsed: action.payload.bool,
			};
		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log("state", state);
	}, [state.items]);

	function toggle(bool) {
		dispatch({ type: "collapse", payload: { bool } });
	}

	function handleChange(e) {
		dispatch({ type: "setInputs", payload: { value: e } });
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch({ type: "setItem" });
		toggle(!state.isCollapsed);
	}

	return (
		<>
			<Layout state={state} onChange={handleChange} onSubmit={handleSubmit} toggle={toggle}>
				<h1>Gallery</h1>
				{`You have ${state.items.length} image${state.items.length > 1 ? "s" : ""}`}
				<div className="row">
					{state.items.map((photo) => (
						<Card src={photo.path} />
					))}
				</div>
			</Layout>
		</>
	);
}

export default App;
