import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (user) {
    // If user is already logged in, redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicRoute;