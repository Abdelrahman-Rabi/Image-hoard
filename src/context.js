import { createContext, useReducer } from "react";

export const Context = createContext();

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

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default Provider;
