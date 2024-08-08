import { useEffect, useState, useReducer } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import "./App.css";
import UploadForm from "./components/UploadForm";

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
			<Navbar />
			<div className="container text-center mt-5">
				<button className="btn btn-success float-end" onClick={() => toggle(!state.isCollapsed)}>
					{state.isCollapsed ? "Close" : "+Add"}
				</button>
				<div className="clearfix mb-4"></div>
				<UploadForm inputs={state.inputs} isVisible={state.isCollapsed} onChange={handleChange} onSubmit={handleSubmit} />
				<h1>Gallery</h1>
				{`You have ${state.items.length} image${state.items.length > 1 ? "s" : ""}`}
				<div className="row">
					{state.items.map((photo) => (
						<Card src={photo.path} />
					))}
				</div>
			</div>
		</>
	);
}

export default App;
