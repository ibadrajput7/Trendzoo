import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/auth';

    useEffect(() => {
        // Check local storage for persisted auth state on mount
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setAdmin(data.data.admin);
            setIsAuthenticated(true);
            localStorage.setItem('admin', JSON.stringify(data.data.admin));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // After register, we should probably login automatically, 
            // but the backend register doesn't return tokens directly in cookies like login does.
            // So we'll call login explicitly.
            return await login(email, password);
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        // To fully secure this, we'd also call a /logout endpoint on the backend to clear cookies.
        // For now, we clear the local state.
        setAdmin(null);
        setIsAuthenticated(false);
        localStorage.removeItem('admin');
    };

    const value = {
        admin,
        isAuthenticated,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
