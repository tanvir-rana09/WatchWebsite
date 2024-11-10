import { Navigate } from "react-router-dom";
import { getLocalStorageItem } from "../utils/setWithExpire";

const NoneProtectedRoute = ({ children }) => {
	const token = getLocalStorageItem('token')
	const user = getLocalStorageItem('user')

	if (token && user?.role == 'user') {
		return <Navigate to="/" replace />;
	}
	if (token && user?.role == 'admin') {
		return <Navigate to="/admin" replace />;
	}

	return children;
}

export default NoneProtectedRoute;