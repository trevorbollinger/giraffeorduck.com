import React, { createContext, useContext, useState, useEffect } from 'react';
import { ACCESS_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode'; // Changed import syntax

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(Boolean(localStorage.getItem(ACCESS_TOKEN)));
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [firstName, setFirstName] = useState(localStorage.getItem("first_name") || "");
    const [lastName, setLastName] = useState(localStorage.getItem("last_name") || "");

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                
                if (decodedToken.exp < currentTime) {
                    // Token has expired
                    logout();
                }
            } catch (error) {
                // Invalid token
                logout();
            }
        } else {
            setIsAuthorized(false);
            setUsername("");
            setFirstName("");
            setLastName("");
            localStorage.removeItem("username");
            localStorage.removeItem("first_name");
            localStorage.removeItem("last_name");
        }
    }, []);

    const login = (user, firstName, lastName) => {
        setIsAuthorized(true);
        setUsername(user);
        setFirstName(firstName);
        setLastName(lastName);
        localStorage.setItem("username", user);
        localStorage.setItem("first_name", firstName);
        localStorage.setItem("last_name", lastName);
    };

    const logout = () => {
        localStorage.clear();
        setIsAuthorized(false);
        setUsername("");
        setFirstName("");
        setLastName("");
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, username, firstName, lastName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
