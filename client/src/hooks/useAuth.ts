'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { User, AuthResponse } from '@/types';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  loginWithWallet: (walletAddress: string, signature: string) => Promise<void>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you might want to validate the token
      // For now, we'll just check if it exists
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await apiClient.login(email, password);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response: AuthResponse = await apiClient.register(username, email, password);
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const loginWithWallet = async (walletAddress: string, signature: string) => {
    try {
      const response: AuthResponse = await apiClient.loginWithWallet(walletAddress, signature);
      setUser(response.user);
    } catch (error) {
      console.error('Wallet login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    loginWithWallet,
    logout,
  };
}