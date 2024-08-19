import { createContext, useContext, useMemo, useState } from "react";
import FirebaseAuth from "../handlers/auth";

const Context = createContext();
const { signIn, signOut, getCurrentUser } = FirebaseAuth;

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	const login = () => signIn().then((user) => setCurrentUser(user.user));
	const logout = () => signOut().then(setCurrentUser(null));
	const authenticate = () => getCurrentUser().then(setCurrentUser);
	const value = useMemo(() => {
		return {
			login,
			logout,
			currentUser,
			authenticate,
		};
	}, [login, logout, currentUser, authenticate]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
	return useContext(Context);
};

export default AuthProvider;
