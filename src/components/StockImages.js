import List from "./List";
import { useAuthContext } from "../context/AuthContext";
import { useFirestoreContext } from "../context/FirestoreContext";
import { useMemo } from "react";

const StockImages = () => {
	const { currentUser } = useAuthContext();
	const { state } = useFirestoreContext();

	const items = useMemo(() => {
		const filtered = state.items.filter((item) => item.user == currentUser?.displayName.split(" ").join(""));
		return currentUser ? filtered : [];
	}, [state.items, currentUser]);

	return (
		<>
			<h1>My Stock Images</h1>
			<List items={items} />
		</>
	);
};
export default StockImages;
