import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

const STORAGE_KEY = 'seekhopk_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [authError, setAuthError] = useState('');

  const login = async (email, password) => {
    setAuthError('');
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Login failed. Please try again.');
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    setAuthError('');
    try {
      const { data } = await registerUser({ name, email, password, role });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authError, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
