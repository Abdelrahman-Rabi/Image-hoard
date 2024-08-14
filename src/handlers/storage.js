import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase.config";
console.log("storage: ", storage);

const Storage = {
	uploadFile(media) {
		return new Promise(async (resolve) => {
			try {
				const mediaRef = ref(storage, `images/${media.title}`);
				uploadBytes(mediaRef, media.file).then((snapshot) => {
					resolve({ path: snapshot.metadata.fullPath, name: media.title });
				});
			} catch (e) {
				console.log("errrorrr", e);
			}
		});
	},
	downloadFile(media) {
		return new Promise(async (resolve) => {
			try {
				const mediaRef = ref(storage, media.path);
				const fileURL = await getDownloadURL(mediaRef);
				resolve(fileURL);
			} catch (e) {
				console.log("errrorrr", e);
			}
		});
	},
};

export default Storage;
