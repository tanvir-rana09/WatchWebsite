// AuthProvider.js
import { useState, useEffect} from 'react';
import { AuthContext } from './AuthContext';
import useApi from '../utils/useApi';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/setWithExpire';

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const { callApi } = useApi('/auth/profile', 'GET');
	const token = getLocalStorageItem('token');
	console.log(token);
	
	useEffect(() => {
		if (token) {
			callApi()
				.then((response) => {
					console.log(response);
					const user = response?.user;
					setIsAuthenticated(true);
					setIsAdmin(user.role == 'admin');
					setLocalStorageItem('user',user)
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
		<AuthContext.Provider value={{ isAuthenticated, isAdmin, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
