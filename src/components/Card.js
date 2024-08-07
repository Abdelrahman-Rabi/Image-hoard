export default function Card({src}) {
	return (
		<div className="col mb-5">
			<div className="card" style={{ width: "18rem" }}>
				<img src={src} className="card-img-top" alt="image" />
			</div>
		</div>
	);
}
