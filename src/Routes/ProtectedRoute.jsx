import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({ children, redirectPath = '/signin', requireAdmin = true }) => {
  const { isAuthenticated, user } = useAuth();

  
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  // Redirect to the home page if admin access is required but user is not an admin
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Render the protected content if all checks pass
  return children;

};


export default ProtectedRoute;
