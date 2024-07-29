import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/v1/users/login', { email, password });
            const { token, user } = response.data;
            sessionStorage.setItem('authToken', token);
            setUser(user);
            setIsAuthenticated(true);
            return { success: true }; // Indicate success
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            return { success: false, message: errorMessage }; // Return error details
        }
    };

    const register = async (email, username, password) => {
        try {
            await axios.post('/api/v1/users/register', { email, username, password });
            return { success: true }; // Indicate success
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            return { success: false, message: errorMessage }; // Return error details
        }
    };

    const logout = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) throw new Error('No token found');

            await axios.post('/api/v1/users/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            sessionStorage.removeItem('authToken');
            setUser(null);
            setIsAuthenticated(false);
            return { success: true }; // Indicate success
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Logout failed. Please try again.';
            return { success: false, message: errorMessage }; // Return error details
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use authentication context
export function useAuth() {
    return useContext(AuthContext);
}
