import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error('Network error. Please check your connection and try again.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error('Network error. Please check your connection and try again.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const googleAuth = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/google`, { token });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Google authentication failed');
        } else if (error.request) {
            throw new Error('Network error. Please check your connection and try again.');
        } else {
            throw new Error('An unexpected error occurred during Google authentication.');
        }
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};