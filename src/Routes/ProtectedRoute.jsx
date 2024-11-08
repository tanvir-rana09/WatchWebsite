import { Navigate } from 'react-router-dom';
import Loader from '../Common/Loading';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({children, redirectPath = '/signin', requireAdmin = true }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
console.log({ isAuthenticated, isAdmin, loading });

  if (loading) {
    return <Loader/>; // Show loading state while checking auth
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

//   return <Outlet />;
  return children;
};

export default ProtectedRoute;
