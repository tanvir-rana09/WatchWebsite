import { useState, useEffect } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/setWithExpire';
import useApi from '../utils/useApi';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
	const { callApi } = useApi('/auth/profile', 'GET');
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true); // Start as true to prevent flicker
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		const token = getLocalStorageItem('token');
		
		if (token) {
			setLoading(true);
			callApi()
				.then((response) => {
					const user = response?.user;
					if (user) {
						setUser(user);
						setIsAuthenticated(true);
						setLocalStorageItem('user', user); 
						setIsAdmin(user.role == 'admin');
					} else {
						setIsAuthenticated(false);
					}
				})
				.catch(() => {
					setIsAuthenticated(false);
					setUser(null);
				})
				.finally(() => setLoading(false));
		} else {
			setIsAuthenticated(false);
			setLoading(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, isAdmin, setIsAdmin, user, setUser, setIsAuthenticated, loading, setLoading }}>
			{children}
		</AuthContext.Provider>
	);
};