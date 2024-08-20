import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config";

const fireStore = {
	readDocs(...args) {
		let docs = [];
		const ref = collection(db, "stocks");
		return new Promise(async (resolve, reject) => {
			try {
				const snapshots = await getDocs(ref);
				snapshots.forEach((doc) => {
					const d = { ...doc.data(), id: doc.id };
					docs.push(d);
				});
				resolve(docs);
			} catch (e) {
				console.error("Error read document: ", e);
				reject(new Error("woops"));
			}
		});
	},
	writeDoc(...args) {
		const [inputs, collection_name] = args;
		return new Promise(async (resolve, reject) => {
			const randomIndex = Math.floor(Math.random() * 100000000);
			try {
				const docRef = doc(db, "stocks", `${randomIndex}`);
				await setDoc(docRef, {
					title: inputs.title,
					path: inputs.path,
					createdAt: serverTimestamp(),
					user: inputs.user,
				});
				resolve("new doc successfully inserted");
			} catch (e) {
				console.error("Error writing document: ", e);
				reject(new Error("woops"));
			}
		});
	},
};

export default fireStore;
