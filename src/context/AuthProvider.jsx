// AuthProvider.js
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/setWithExpire';
import useApi from '../utils/useApi';

export const AuthProvider = ({ children }) => {
	const { callApi } = useApi('/auth/profile', 'GET');
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState()
	const [loading, setLoading] = useState(false);
	const token = getLocalStorageItem('token');

	useEffect(() => {
		if (token) {
			callApi()
				.then((response) => {
					const user = response?.user;
					setIsAuthenticated(true);
					setIsAdmin(user.role == 'admin');
					setLocalStorageItem('user', user)
				})
				.catch(() => {
					setIsAuthenticated(false);
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
