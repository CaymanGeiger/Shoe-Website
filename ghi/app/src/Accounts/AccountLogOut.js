import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';


export const useLogout = () => {
    const navigate = useNavigate();
    const { checkAuthStatus, logout } = useAuth();
    const [csrfToken, setCsrfToken] = useState('');


    useEffect(() => {
    const fetchCsrfToken = async () => {
        try {
        const response = await fetch('http://localhost:8000/api/csrf-token/', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        } else {
            console.error('Failed to fetch CSRF token.');
        }
        } catch (error) {
        console.error('Error fetching CSRF token:', error);
        }
    };

    fetchCsrfToken();
    }, []);


    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/account/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            });

            if (response.ok) {
                logout();
                checkAuthStatus()
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred while trying to log out:', error);
        }
    };
    return handleLogout;
};


    export const LogoutButton = () => {
        const handleLogout = useLogout();
        return (
            <button className="btn btn-sm accountButtons" onClick={handleLogout}>
                Logout
            </button>
        );
    };

    export default LogoutButton;
