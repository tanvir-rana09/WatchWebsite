// useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext); 
