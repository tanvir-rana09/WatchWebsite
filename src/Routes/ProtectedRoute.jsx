import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { getLocalStorageItem } from '../utils/setWithExpire';


const ProtectedRoute = ({ children, redirectPath = '/signin', requireAdmin = true }) => {
  const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, setUser, loading, setLoading } = useAuth();
  const token = getLocalStorageItem('token')
  const user = getLocalStorageItem('user')
  
  if (!token) {
    return <Navigate to={redirectPath} />;
  }
  if (user?.role == 'user') {
    return <Navigate to='/' />;
  }
  return children;

};


export default ProtectedRoute;
