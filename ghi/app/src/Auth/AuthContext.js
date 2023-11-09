import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userFirstName, setUserFirstName] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/check-auth-status', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
            setUserId(data.id);
            setUserFirstName(data.first_name);
            setIsActive(data.is_active);
        } catch (error) {
            console.error('Failed to check auth status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async () => {
        await checkAuthStatus();
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value = {
        isAuthenticated,
        userFirstName,
        userId,
        isActive,
        login,
        logout,
        isLoading,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
