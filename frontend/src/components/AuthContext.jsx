import React, { createContext, useContext, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(Boolean(localStorage.getItem(ACCESS_TOKEN)));

    const login = (username, password) => {
        setIsAuthorized(true);
    };

    const logout = () => {
        localStorage.clear();
        setIsAuthorized(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
