import React, { createContext, useState, useEffect } from 'react'; // Import useEffect
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, signOut } from "firebase/auth"; // Import onAuthStateChanged
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginwithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe(); // Corrected function call
        };
    }, []);

    const authInfo = {
        user,
        createUser,
        loginwithGoogle,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
