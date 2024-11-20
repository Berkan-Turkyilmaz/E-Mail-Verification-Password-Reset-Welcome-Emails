import {create } from "zustand";
import axios from "axios";


axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth:true,
    message: null,
    authError: null,

    signup: async (email, password, name ) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", {email, password, name});
            set({user: response.data.newUser, isAuthenticated: true, isLoading: false});
            console.log(response.data);
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Something went wrong", isLoading: false});
            throw error;
        }
        
    },
    verifyEmail: async (code) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post("http://localhost:3000/api/auth/verify-email", {code});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
            console.log(response.data);
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Something went wrong", isLoading: false});
            throw error;
        }
    },
    checkAuth: async () => {
        set({isCheckingAuth: true, error: null});
        try {
            const response = await axios.get("http://localhost:3000/api/auth/check-auth");
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
            console.log(response.data);
            return response.data;
        } catch (error) {
            set({authError: error.message || "Something went wrong", isCheckingAuth: false, isAuthenticated: false});
            throw error;
        }
    },  
    login:  async (email, password  ) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {email, password});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
            console.log(response.data);
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Something went wrong", isLoading: false});
            throw error;
        }},
    logout: async () => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post("http://localhost:3000/api/auth/logout");
            set({user: null, isAuthenticated: false, isLoading: false});
            console.log(response.data);
            return response.data;
        } catch (error) {
            set({error: error.message || "Something went wrong", isLoading: false});
            throw error;
        }
    },
    forgotPassword: async (email) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post("http://localhost:3000/api/auth/forgot-password", {email});
            set({message: response.data.message,  isLoading: false});
            console.log(response.data);
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Something went wrong", isLoading: false});
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post("http://localhost:3000/api/auth/reset-password/${token}", {password});
            set({message: response.data.message, isLoading: false});
            console.log(response.data);
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Something went wrong", isLoading: false});
            throw error;
        }
    },
})) 