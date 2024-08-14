import { createContext, useReducer } from "react";
import firestore from "./handlers/firestore";
export const Context = createContext();

const { readDocs } = firestore;
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
	switch (action.type) {
		case "setItem":
			return {
				...state,
				items: [state.inputs, ...state.items],
				inputs: { title: null, file: null, path: null },
			};
		case "setItems":
			return {
				...state,
				items: action.payload.items,
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

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const read = async () => {
		const items = await readDocs("stocks");
		dispatch({ type: "setItems", payload: { items } });
	};
	return <Context.Provider value={{ state, dispatch, read }}>{children}</Context.Provider>;
};

export default Provider;
