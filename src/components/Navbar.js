function Navigation() {
	return (
		<ul className="navbar-nav me-auto mb-2 mb-lg-0">
			<li className="nav-item">
				<a className="nav-link active" aria-current="page" href="#">
					Home
				</a>
			</li>
		</ul>
	);
}

function SearchForm() {
	return (
		<form className="d-flex" role="search">
			<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
			<button className="btn btn-outline-success" type="submit">
				Search
			</button>
		</form>
	);
}

function Login() {
	return (
		<ul className="navbar-nav me-auto mb-2 mb-lg-0">
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Login
				</a>
				<ul className="dropdown-menu">
					<li>
						<a className="dropdown-item" href="#">
							Profile
						</a>
					</li>
				</ul>
			</li>
		</ul>
	);
}
export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					Image Hoard
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<Navigation />
					<SearchForm />
					<Login />
				</div>
			</div>
		</nav>
	);
}
