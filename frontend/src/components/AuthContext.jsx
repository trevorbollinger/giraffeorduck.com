import React, { createContext, useContext, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(Boolean(localStorage.getItem(ACCESS_TOKEN)));
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [firstName, setFirstName] = useState(localStorage.getItem("first_name") || ""); // New state for first_name
    const [lastName, setLastName] = useState(localStorage.getItem("last_name") || ""); // New state for last_name

    const login = (user, firstName, lastName) => {
        setIsAuthorized(true);
        setUsername(user);
        setFirstName(firstName); // Set first name in state
        setLastName(lastName); // Set last name in state
        localStorage.setItem("username", user);
        localStorage.setItem("first_name", firstName); // Persist first name in localStorage
        localStorage.setItem("last_name", lastName); // Persist last name in localStorage
    };

    const logout = () => {
        localStorage.clear();
        setIsAuthorized(false);
        setUsername("");
        setFirstName(""); // Clear first name on logout
        setLastName(""); // Clear last name on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, username, firstName, lastName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
