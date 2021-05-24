import React, { useContext, useEffect, useState } from 'react'
import notesStore from '../store';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    
    const { currentUser, setCurrentUser } = notesStore();
    const [ loading, setLoading ] = useState(true);

    function register(user) {
        return auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    function login(user) {
        return auth.signInWithEmailAndPassword(user.email, user.password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    // run this on mount just once
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe; // this unsubscribes from stream listener
    }, []);


    const value = {
        currentUser,
        login,
        logout,
        register,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}

