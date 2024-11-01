import React, { createContext, useContext, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(Boolean(localStorage.getItem(ACCESS_TOKEN)));
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [firstName, setFirstName] = useState(localStorage.getItem("first_name") || ""); // New state for first_name

    const login = (user) => {
        setIsAuthorized(true);
        setUsername(user); // Set username in state
        localStorage.setItem("username", user); // Persist username in localStorage
    };

    const logout = () => {
        localStorage.clear();
        setIsAuthorized(false);
        setUsername("");
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
