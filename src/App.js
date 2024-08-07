import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import "./App.css";
import UploadForm from "./components/UploadForm";

const photos = [
	"https://picsum.photos/id/1001/200/200",

];
function App() {
	const [items, setItems] = useState(photos);
	const [count, setCount] = useState();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [inputs, setInputs] = useState({ title: null, file: null, path: null });
	console.log("inputs: ", inputs);

	const handleChange = (e) => {
		if (e.target.name === "file") {
			setInputs({ ...inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0]) });
		} else setInputs({ ...inputs, title: e.target.value });
	};

	function toggle() {
		setIsCollapsed((prvIsCollapsed) => !prvIsCollapsed);
	}

	function handleSubmit(e) {
		e.preventDefault();
		setItems([inputs.path, ...items]);
		setInputs({ title: null, file: null, path: null })
		setIsCollapsed(false)
	}

	useEffect(() => {
		setCount(`You have ${items.length} image${items.length > 1 ? "s" : ""}`);
	}, [items]);
	return (
		<>
			<Navbar />
			<div className="container text-center mt-5">
				<button className="btn btn-success float-end" onClick={toggle}>
					{isCollapsed ? "Close" : "+Add"}
				</button>
				<div className="clearfix mb-4"></div>
				<UploadForm inputs={inputs} isVisible={isCollapsed} onChange={handleChange} onSubmit={handleSubmit} />
				<h1>Gallery</h1>
				{count}
				<div className="row">
					{items.map((photo) => (
						<Card src={photo} />
					))}
				</div>
			</div>
		</>
	);
}

export default App;
