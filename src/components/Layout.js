import { useContext } from "react";
import Navbar from "./Navbar";
import UploadForm from "./UploadForm";
import { Context } from "../context";

function Layout({ children }) {
	const { state, dispatch } = useContext(Context);

	return (
		<>
			<Navbar />
			<div className="container mt-5">
				<button
					className="btn btn-success float-end"
					onClick={() => dispatch({ type: "collapse", payload: { bool: !state.isCollapsed } })}
				>
					{state.isCollapsed ? "Close" : "+Add"}
				</button>
				<div className="clearfix mb-4"></div>
				<UploadForm />
				{children}
			</div>
		</>
	);
}
export default Layout;
