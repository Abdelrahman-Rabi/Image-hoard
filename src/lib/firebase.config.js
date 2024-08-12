// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCe6xTcXcQJCjblPkxl3W43EoFKH2k_hWA",
	authDomain: "image-hoard.firebaseapp.com",
	projectId: "image-hoard",
	storageBucket: "image-hoard.appspot.com",
	messagingSenderId: "746779420567",
	appId: "1:746779420567:web:66efe00115382fafd386d2",
};

// Initialize Firebase
const app = () => {
	if (!firebaseConfig || !firebaseConfig.apiKey) {
		throw new Error(`No firebase config object provided ...`);
	} else {
		console.log("Firebase Inialized ...");
	}
	return initializeApp(firebaseConfig);
};

export default app
