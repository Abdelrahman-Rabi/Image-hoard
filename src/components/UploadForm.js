import { useContext, useMemo } from "react";
import { Context } from "../context";
import fireStore from "../handlers/firestore";
import Storage from "../handlers/storage";

const { writeDoc } = fireStore;
const { uploadFile, downloadFile } = Storage;

const Preview = () => {
	const { state } = useContext(Context);
	const { inputs } = state;
	return (
		inputs.path && (
			<div
				className="rounded p-1 m-5"
				style={{
					width: "30%",
					height: "300px",
					backgroundImage: `url(${inputs.path}`,
					backgroundSize: "cover",
				}}
			></div>
		)
	);
};

const UploadForm = () => {
	const { state, dispatch } = useContext(Context);
	const { inputs, isCollapsed } = state;

	const isDisabled = useMemo(() => {
		return !!Object.values(inputs).some((input) => !input);
	}, [inputs]);

	function handleSubmit(e) {
		e.preventDefault();
		uploadFile(state.inputs)
			.then(downloadFile)
			.then((url) => {
				debugger;
				writeDoc({ ...inputs, path: url }, "stocks").then(() => {
					dispatch({ type: "setItem" });
					dispatch({ type: "collapse", payload: { bool: false } });
				});
			});
	}

	function handleChange(e) {
		dispatch({ type: "setInputs", payload: { value: e } });
	}

	return (
		isCollapsed && (
			<>
				<p className="display-6 text-center mb-3">Upload Stock Image</p>
				<div className="mb-5 d-flex align-items-center justify-content-center">
					<Preview />
					<form className="mb-2" style={{ textAlign: "left" }} onSubmit={handleSubmit}>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								name="title"
								placeholder="title"
								aria-describedby="text"
								onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<input type="file" className="form-control" name="file" onChange={handleChange} />
						</div>
						<button type="submit" className="btn btn-success float-end" disabled={isDisabled}>
							Save changes
						</button>
					</form>
				</div>
			</>
		)
	);
};

export default UploadForm;
