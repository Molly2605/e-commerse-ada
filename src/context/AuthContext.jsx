import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const registerUser = async (data) => {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        setUser(userCredential.user);
    };

    const login = async (data) => {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        setUser(userCredential.user);
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, registerUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};